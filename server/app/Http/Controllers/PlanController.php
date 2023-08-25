<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
public function addPlan(Request $request) {
    $auth_user_id = Auth::user()->id;
    $recipe_id = $request->recipe_id;
    $date = $request->date;

    $existingPlan = Plan::where('user_id', $auth_user_id)
                         ->where('recipe_id', $recipe_id)
                         ->where('date', $date)
                         ->first();

    if ($existingPlan) {
        return response()->json([
            "status" => "error",
            "message" => "already exists",
        ]); 
    }

    $plan = new Plan();
    $plan->user_id = $auth_user_id;
    $plan->recipe_id = $recipe_id;
    $plan->date = $date;

    $plan->save();
    
    return response()->json([
        "status" => "success",
    ]);
}

    public function getPlan($date) {
        $auth_user_id = Auth::user()->id;

        $plan = Plan::where('user_id', $auth_user_id)
                     ->where('date', $date)->with("recipe.ingredients.ingredient")
                     ->get();

        if ($plan->isEmpty()) {
            return response()->json([
                "status" => "error",
                "message" => "Plan not found",
                "plan" => [],
            ]);
    }
    return response()->json([
        "status" => "success",
        "plan" => $plan,
        ]);
    }

    public function deletePlan(Request $request) {
        $auth_user_id = Auth::user()->id;
        
        $plan = Plan::where('user_id', $auth_user_id)
                ->where('recipe_id', $request->recipe_id)
                ->where('date', $request->date)
                ->first();

        if (!$plan) {
            return response()->json([
                "status" => "error",
                "message" => "Plan not found",
            ]);
        }

        $plan->delete();

        return response()->json([
            "status" => "success",
            "message" => "Plan deleted successfully",
        ]);
    }
}
