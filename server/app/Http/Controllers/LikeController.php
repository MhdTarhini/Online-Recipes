<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
     function addLike($id) {
        $auth_user = Auth::user()->id;
        $like=new Like;
        $like->user_id = $auth_user;
        $like->recipe_id =$id;
        $like->save();
        return response()->json([
            "status" => "success",
        ]);
        
    }
    function removeLike($id) {
        $auth_user = Auth::user();
        $like=Like::where("recipe_id",$id)->where("user_id", $auth_user->id)->first();
        $like->delete();
        return response()->json([
            "status" => "success", 
        ]);
        
    }

    function userIsLiked(){
        $auth_user=Auth::user();
        $is_liked=Like::isliked($auth_user->id)->pluck('recipe_id')->toArray();
        return response()->json([
            "status" => "success", 
            "data" => $is_liked, 
        ]);
    }
}
