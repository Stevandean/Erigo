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
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->string('receipt_number');
            $table->enum('payment_method', ['qris', 'bank_transfer']);
            $table->enum('status_payment', ['not_paid', 'paid'])->default('not_paid');
            $table->enum('status_courier', ['packaged', 'on_the_way', 'arrived', 'transaction_done']);
            $table->unsignedBigInteger('users_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('users_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
