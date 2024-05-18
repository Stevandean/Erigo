<?php

namespace App\Http\Controllers;

use App\Models\Rating;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    /**
     * show all data
     */
    public function index(Rating $rating)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $rating::all()
        ], 200);
    }

    /**
     * create data
     */
    public function store(Request $request, Rating $rating)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'required|integer',
                'product_id' => 'required|integer',
                'users_id' => 'required|integer',
                'rating' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $store = $rating::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        if ($store) {
            return Response()->json([
                'status' => true,
                'message' => 'Success create new data!',
                'data' => $store
            ], 200);
        } else {
            return Response()->json([
                'status' => false,
                'message' => 'Failed create data!'
            ], 404);
        }
    }

    /**
     * show data by id
     */
    public function show($rating_id)
    {
        if (Rating::where('id', $rating_id)->exists()) {
            $data = Rating::join('transaction', 'transaction.id', '=', 'rating.transaction_id')
                ->join('product', 'product.id', '=', 'rating.product_id')
                ->join('users', 'users.id', '=', 'rating.users_id')
                ->where('rating.id', $rating_id) // specify 'rating.id' to avoid ambiguity
                ->select('rating.*', 'transaction.*', 'product.*', 'users.*') // select the columns you need
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed find the data!',
                'data' => ''
            ], 404);
        }
    }

    /**
     * Update data
     */
    public function update(Request $request, Rating $rating, $rating_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'required',
                'product_id' => 'required',
                'users_id' => 'required',
                'rating' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $update = $rating::table('rating')->where('rating_id', '=', $rating_id)->update([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        if ($update) {
            return Response()->json([
                'status' => true,
                'message' => 'Success updating data!',
                'data' => $update
            ], 200);
        } else {
            return Response()->json([
                'status' => false,
                'message' => 'Failed updating data!'
            ], 404);
        }
    }

    /**
     * Delete data
     */
    public function destroy(Rating $rating, $rating_id)
    {
        $delete = $rating::table('rating')->where('rating_id', '=', $rating_id)->delete();

        if ($delete) {
            return Response()->json([
                'status' => true,
                'message' => 'Success delete data!'
            ], 200);
        } else {
            return Response()->json([
                'status' => false,
                'message' => 'Failed delete data!'
            ], 404);
        }
    }
}
