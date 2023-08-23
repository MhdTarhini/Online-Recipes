<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

        public function user()
    {
        return $this->belongsTo(User::class);
    }
        public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }
        public function ingredients()
    {
        return $this->hasMany(RecipeIngredient::class, 'recipe_id');
    }
        public function images()
    {
        return $this->hasMany(Image::class);
    }
        public function plans()
    {
        return $this->belongsToMany(Plan::class)->withTimestamps();
    }
        public function shoppingLists()
    {
        return $this->belongsToMany(ShopList::class)->withTimestamps();
    }

        public function shoppingListItems()
    {
        return $this->hasMany(ShopListItem::class);
    }
}
