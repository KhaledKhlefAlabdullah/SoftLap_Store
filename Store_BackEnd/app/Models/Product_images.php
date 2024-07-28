<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_images extends Model
{
    use HasFactory;

    // Set primary key data type : string
    protected $keyType = 'string';

    // Set incrementing : false
    public $incrementing = false;

    // Set id as primary key
    protected $primaryKey ='id';

    // The object attribute

    protected $fillable =[
      'id',
      'product_id',
      'img_name',
      'img_src'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
