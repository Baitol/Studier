<?php
namespace App\Services\Role;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleService
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return $roles;
    }

    public function show($name, $guardName = 'web')
    {
        $role = Role::findByName($name, $guardName);
        $permissions = $role->permissions;
        $data = [
            'role' => $role,
            'permissions' => $permissions,
        ];
        return $data;
    }

    public function store($request)
    {
        $fields = $request->validate([
            'name' => 'required|unique:roles|string|max:255',
            'permissions' => 'sometimes|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);
        $role = Role::firstOrCreate(['name' => $fields->name, 'guard_name' => 'web']);
        $role->givePermissionTo($fields->permissions);
        return [
            'roleId' => $role->id,
        ];
    }

    public function update($request, string $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                'message' => 'Role not found'
            ], 404);
        }
        $fields = $request->validate([
            'name' => 'sometimes|string|max:255|min:3|unique:roles,name,' . $id,
            'permissions' => 'sometimes|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        if (isset($fields['name']) && $fields['name'] !== $role->name) {
            $role->update(['name' => $fields['name']]);
        }
        if (isset($fields['permissions'])) {
            $role->syncPermissions($fields['permissions']);
        }
        return [
            'roleId' => $role->id,
        ];
    }

    public function destroy($id)
    {
        $role = Role::where('id', $id)
            ->where('is_deleted', false)
            ->first();
        if (!$role) {
            return response()->json([
                'message' => 'Role not found'
            ], 404);
        }
        $role->update([
            'is_deleted' => true,
        ]);

        return response()->json([
            'message' => 'Role deleted',
            'roleId' => $role->id,
        ]);
    }
}
