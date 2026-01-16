<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Role\RoleService;
class RoleController extends Controller
{
    private $roleService;
    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }
    public function index()
    {
        $users = $this->roleService->index();
        return $users;
    }

    public function show(string $name)
    {
        $role = $this->roleService->show($name);
        return $role;
    }

    public function store(Request $request)
    {

        $role = $this->roleService->store($request);
        return $role;
    }

    public function update(Request $request, string $id)
    {


        $role = $this->roleService->update($request, $id);
        return $role;
    }

    public function destroy(string $id)
    {
        $role = $this->roleService->destroy($id);
        return $role;
    }
}
