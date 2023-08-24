<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ShopListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => "auth:api"], function(){
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
        Route::get("profile", [AuthController::class, "profile"]);

        Route::post("add_recipe", [RecipeController::class, "CreateRecipe"]);
        Route::get("get_recipes", [RecipeController::class, "getRecipes"]);

        Route::get("add_to_list/{id?}",[ShopListController::class,"addToList"]);
        Route::get("get_list",[ShopListController::class,"getShopList"]);
        Route::delete("remove_item/{id?}",[ShopListController::class,"removeItem"]);

        Route::post('add_comment',[CommentController::class,"addComment"]);

        Route::get("add_like/{id?}",[LikeController::class,"addLike"]);
        Route::delete("remove_like/{id?}",[LikeController::class,"removeLike"]);
        Route::get('user_likes',[LikeController::class,"userIsLiked"]);

        Route::post('add_plan',[PlanController::class,"addPlan"]);
        Route::get('get_plan/{date?}',[PlanController::class,"getPlan"]);
        Route::post('delete_plan',[PlanController::class,"deletePlan"]);

        Route::get("search/{search}",[RecipeController::class,"searchRecipes"]);
    });

Route::group(["prefix" => "guest"], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});


