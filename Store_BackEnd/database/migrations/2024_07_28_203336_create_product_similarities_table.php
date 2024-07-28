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
        Schema::create('product_similarities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product1_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product2_id')->constrained('users')->onDelete('cascade');
            $table->float('similarity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_similarities');
    }
};
