<?php
namespace App\Services\Role;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleService
{
    public function index()
    {
        $roles = Role::query()
            ->select('id', 'name', 'status_id')
            ->with([
                'permissions:id,name',
                'status:id,name,color'
            ])
            ->get();

        $permissions = Permission::select('id', 'name')->get();

        $data = [
            'roles' => $roles,
            'permissions' => $permissions
        ];
        return $data;
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
            'permissions.*' => 'integer|exists:permissions,id',
        ]);
        $role = Role::firstOrCreate(['name' => $fields['name'], 'guard_name' => 'web', 'status_id' => 3,]);
        $role->givePermissionTo($fields['permissions']);
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
            'statusId' => 'required|integer|exists:role_statuses,id',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        if (isset($fields['name']) && $fields['name'] !== $role->name) {
            $role->update(['name' => $fields['name']]);
        }
        if (isset($fields['statusId']) && $fields['statusId'] !== $role->statusId) {
            $role->update(['status_id' => $fields['statusId']]);
        }
        if (isset($fields['permissions'])) {
            $permissions = Permission::whereIn('id', $fields['permissions'])->pluck('name');
            $role->syncPermissions($permissions);
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
