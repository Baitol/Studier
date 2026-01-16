<?php
namespace App\Services\User;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
class UserService {
    public function index()
    {
        $users = user::all();
        return $users;
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        return $user;
    }

    public function store($request)
    {
        $fields = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);
        $user = User::create($fields);
        return [
            'userId' => $user->id,
        ];
    }

    public function update($request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $fields = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'confirmed'
        ]);

        if (!empty($fields['password'])) {
            $fields['password'] = Hash::make($fields['password']);
        } else {
            unset($fields['password']); // щоб не перезаписати null
        }

        $user->update($fields);
        return [
            'userId' => $user->id,
        ];
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)
            ->where('is_deleted', false)
            ->firstOrFail();

        $user->update([
            'is_deleted' => true,
        ]);

        return response()->json([
            'message' => 'User deleted',
            'userId' => $user->id,
        ]);
    }
}
