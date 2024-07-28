<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use \Illuminate\Support\Facades\Hash;
use \App\Models\User;
use \App\Models\Role;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->string('id')->unique()->primary();
            $table->string('user_id');
            $table->string('role_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->timestamps();
        });

        $user=User::where('email','adminManager@gmail.com')->first();
        $user_id=$user->id;
        $role=Role::where('role','admin')->first();
        $role_id=$role->id;
        if($user && $role){
            DB::table('user_roles')->insert([
                'id'=>Hash::make(now()),
                'user_id'=>$user_id,
                'role_id'=>$role_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
};
