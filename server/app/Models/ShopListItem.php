<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopListItem extends Model
{
    use HasFactory;

        public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
