<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
        public function recipeIngrediants()
    {
        return $this->hasMany(RecipeIngredient::class, 'ingredient_id');
    }
}
