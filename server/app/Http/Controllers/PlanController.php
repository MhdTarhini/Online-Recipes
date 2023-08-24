<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
    public function addPlan(Request $request) {

        $auth_user = Auth::user()->id;
        $plan=new Plan();
        $plan->user_id = $auth_user;
        $plan->recipe_id =$request->recipe_id;
        $plan->date =$request->date;

        $plan->save();
        return response()->json([
            "status" => "success",
        ]);
    }
}
