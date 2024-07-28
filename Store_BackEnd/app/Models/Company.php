<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';

    protected $fillable = [
        'country_id',
        'name',
        'logo',
        'date_of_establishment'
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
