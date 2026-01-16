<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\User\UserService;
class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;

    }
    public function index()
    {
        $users = $this->userService->index();
        return $users;
    }

    public function show(string $id)
    {
        $user = $this->userService->show($id);
        return $user;
    }

    public function store(Request $request)
    {

        $user = $this->userService->store($request);
        return $user;
    }

    public function update(Request $request, string $id)
    {


        $user = $this->userService->update($request, $id);
        return $user;
    }

    public function destroy(string $id)
    {
        $user = $this->userService->destroy($id);
        return $user;
    }
}
