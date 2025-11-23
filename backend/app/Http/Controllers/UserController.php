<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\View\View;

class UserController extends Controller
{
    /**
     * Show the profile for a given user.
     */
    public function showUser(string $id)
    {
        $user = User::find($id); // find повертає null, якщо не знайде
        return [
            'user' => $user ?? "no current user"
        ];
    }
}