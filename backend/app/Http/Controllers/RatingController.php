<?php

namespace App\Http\Controllers;

use App\Models\Rating;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    /**
     * Show all data
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
     * Create data
     */
    public function store(Request $request, Rating $rating)
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

        $store = $rating::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        $data = $rating::where('transaction_id', '=', $request->transaction_id)->get();
        if ($store) {
            return Response()->json([
                'status' => 1,
                'message' => 'Success create new data!',
                'data' => $data
            ]);
        } else {
            return Response()->json([
                'status' => 0,
                'message' => 'Failed create data!'
            ]);
        }
    }

    /**
     * Show data by id
     */
    public function show(Rating $rating, $rating_id)
    {
        if ($rating::where('rating_id', $rating_id)->exists()) {
            $data = $rating::where('rating.rating_id', '=', $rating_id)->get();

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

        $update = DB::table('rating')->where('rating_id', '=', $rating_id)->update([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        $data = $rating::where('rating_id', '=', $rating_id)->get();
        if ($update) {
            return Response()->json([
                'status' => 1,
                'message' => 'Success updating data!',
                'data' => $data
            ]);
        } else {
            return Response()->json([
                'status' => 0,
                'message' => 'Failed updating data!'
            ]);
        }
    }

    /**
     * Delete data
     */
    public function destroy($id)
    {
        $delete = DB::table('rating')->where('rating_id', '=', $id)->delete();

        if ($delete) {
            return Response()->json([
                'status' => 1,
                'message' => 'Success delete data!'
            ]);
        } else {
            return Response()->json([
                'status' => 0,
                'message' => 'Failed delete data!'
            ]);
        }
    }
}
