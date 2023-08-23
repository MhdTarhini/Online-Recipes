<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Recipe_Image;
use App\Models\RecipeIngredient;
use App\Models\RecipesImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    function CreateRecipe(Request $request){
    $recipe = new Recipe();
    $recipe->user_id = Auth::id();
    $recipe->name = $request->name;
    $recipe->cuisine = $request->cuisine;
    $recipe->save();

    foreach ($request->ingredients as $ingredientData) {
        $ingredient = new Ingredient();
        $ingredient->name = $ingredientData['name'];
        $ingredient->quantity = $ingredientData['quantity'];
        $ingredient->save();

        $recipeIngredient = new RecipeIngredient();
        $recipeIngredient->recipe_id = $recipe->id;
        $recipeIngredient->ingredient_id = $ingredient->id;
        $recipeIngredient->save();
    }

     foreach ($request->images as $imageData) {
        $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData));
        $image_name = time() . '_' . uniqid() . '.png'; 
        $image_path = public_path('images') . '/' . $image_name;
        file_put_contents($image_path, $image_data);

        $recipeImage = new RecipesImage();
        $recipeImage->recipe_id = $recipe->id;
        $recipeImage->image_url = asset('images/' . $image_name);
        $recipeImage->save();
    }


    return response()->json([
        'status' => 'success',
        'recipe' => $recipe,
    ]);
   }
}
