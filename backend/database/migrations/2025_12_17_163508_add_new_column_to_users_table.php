<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->after("id")->nullable();
            $table->string('last_name')->after("first_name")->nullable();
            $table->string('avatar')->after("last_name")->nullable();
            $table->boolean(column: 'is_deleted')->default(0);
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('avatar');
            $table->dropColumn('is_deleted');
            $table->string('name')->after("id")->nullable();
        });
    }
};
