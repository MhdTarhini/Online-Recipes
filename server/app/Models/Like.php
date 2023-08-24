<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
        function scopeIsliked($query,$id){
        return $query->where('user_id', $id);
    }
}
