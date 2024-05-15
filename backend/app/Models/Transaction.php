<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'transaction';

    protected $fillable = ['receipt_number', 'payment_method', 'status_payment', 'status_courier', 'users_id'];
}
