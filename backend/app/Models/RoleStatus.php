<?php

namespace App\Models;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoleStatus extends Model
{
    protected $table = 'role_statuses'; // вказуємо таблицю, якщо не стандартна
    protected $fillable = ['name', 'color'];

    // Опціонально: зв'язок назад до ролей
    public function roles(): HasMany
    {
        return $this->hasMany(Role::class, 'role_status_id');
    }
}