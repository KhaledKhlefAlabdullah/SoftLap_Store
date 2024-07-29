<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use \Illuminate\Support\Facades\Hash;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profile')->nullable();
            $table->enum('user_type', ['admin', 'customer']);
            $table->string('cluster')->nullable();
            $table->timestamps();
        });

        $password = Hash::make('adminManager@1');
        DB::table('users')->insert([
            'id' => 1,
            'country_id' => 1,
            'name' => 'admin',
            'email' => 'adminManager@gmail.com',
            'password' => $password,
            'user_type' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
