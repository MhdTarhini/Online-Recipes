<?php

namespace App\Http\Controllers;

use App\Models\ShopList;
use App\Models\ShopListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopListController extends Controller
{
    function addToList($id){
        $user=Auth::user();
        $shopList = ShopList::firstOrCreate(['user_id' => $user->id]);

        if (!$shopList->items()->where('recipe_id', $id)->exists()) {
            $shopItem = new ShopListItem();
            $shopItem->list_id = $shopList->id;
            $shopItem->recipe_id = $id;
            $shopItem->save();
        }else{
            return response()->json([
              'status' => 'failed',
              'message'=>'already added'
            ]);
        }
        return response()->json([
        'status' => 'success',
        'data' => $shopItem,
        ]);
    }

    function getShopList() {
    $user = Auth::user();
    $shopList = ShopList::where('user_id', $user->id)->with('items.recipe.ingredients.ingredient')->first();

    return response()->json([
        'status' => 'success',
        'data' => $shopList,
        ]);
    }

    function removeItem($id) {
    $user = Auth::user();
    $shopList = ShopList::where('user_id', $user->id)->first();

    if (!$shopList) {
        return response()->json(['status' => 'failed',]);
    }

    $item = ShopListItem::find($id);
     if (!$item || $item->list_id !== $shopList->id) {
        return response()->json(['status' => 'failed',]);
    }

    $item->delete();

    return response()->json(['status' => 'success',]);

    }

}
