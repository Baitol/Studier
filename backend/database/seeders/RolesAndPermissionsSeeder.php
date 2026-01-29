<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {

        $roleStatuses = [
            [
                'name' => 'Active',
                'color' => 'text-green-600'
            ],
            [
                'name' => 'Inactive',
                'color' => 'text-gray-600'
                
            ],
            [
                'name' => 'Pending',
                'color' => 'text-yellow-600'
            ],
        ];
        DB::table('role_statuses')->insertOrIgnore($roleStatuses);

        $permissions = [
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin', 'status_id' => null, 'guard_name' => 'web']);
        $user = Role::firstOrCreate(['name' => 'user', 'status_id' => null, 'guard_name' => 'web']);

        $admin->givePermissionTo($permissions);
        $user->givePermissionTo(['users.view']);

        $adminUser = User::factory()->create([
            'first_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'secret123',
        ]);

        $adminUser->assignRole($admin);
    }
}
