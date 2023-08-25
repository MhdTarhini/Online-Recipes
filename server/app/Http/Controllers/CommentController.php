<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
        public function addComment(Request $request)
    {
        $comment = new Comment();
        $comment->recipe_id = $request->recipeId;
        $comment->user_id = Auth::id();
        $comment->content = $request->content;
        $comment->save();
        $with_user=$comment->with('user')->first();
        return response()->json([
            'status' => 'success',
            'comment' => $with_user,
        ]);
    }

}
