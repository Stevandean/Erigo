<?php

namespace App\Http\Controllers;

use App\Models\Rating;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    /**
     * Show all data.
     */
    public function index(Rating $rating)
    {
        // Retrieves all ratings and returns them as a JSON response.
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $rating::all()
        ], 200);
    }

    /**
     * Create data.
     */
    public function store(Request $request, Rating $rating)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'required|integer',
                'product_id' => 'required|integer',
                'users_id' => 'required|integer',
                'rating' => 'required|string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Creates a new rating record based on the provided request data.
        $store = $rating::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        // Returns a success message and the created data if successful, otherwise an error message.
        if ($store) {
            return response()->json([
                'status' => true,
                'message' => 'Success create new data!',
                'data' => $store
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed create data!'
            ], 500);
        }
    }

    /**
     * Show data by id.
     */
    public function show($rating_id)
    {
        // Checks if the rating with the specified ID exists.
        if (Rating::where('id', $rating_id)->exists()) {
            // Retrieves the rating data along with associated transaction, product, and user data.
            $show = Rating::join('transaction', 'transaction.id', '=', 'rating.transaction_id')
                ->join('product', 'product.id', '=', 'rating.product_id')
                ->join('users', 'users.id', '=', 'rating.users_id')
                ->where('rating.id', $rating_id) // specify 'rating.id' to avoid ambiguity
                ->select('rating.*', 'transaction.*', 'product.*', 'users.*') // select the columns you need
                ->first();

            // Returns the retrieved data as a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the rating is not found.
            return response()->json([
                'success' => false,
                'message' => 'Failed find the data!',
                'data' => ''
            ], 500);
        }
    }

    /**
     * Update data.
     */
    public function update(Request $request, int $rating_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'integer',
                'product_id' => 'integer',
                'users_id' => 'integer',
                'rating' => 'string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Updates the rating record with the specified ID based on the provided request data.
        $update = Rating::where('id', $rating_id)->update([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'users_id' => $request->users_id,
            'rating' => $request->rating
        ]);

        // Returns a success message and the number of affected rows if successful, otherwise an error message.
        if ($update) {
            return response()->json([
                'status' => true,
                'message' => 'Success updating data!',
                'data' => $update
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed updating data!'
            ], 500);
        }
    }

    /**
     * Delete data.
     */
    public function destroy(int $rating_id)
    {
        // Deletes the rating record with the specified ID.
        $delete = Rating::where('id', $rating_id)->delete();

        // Returns a success message if deletion was successful, otherwise an error message.
        if ($delete) {
            return response()->json([
                'status' => true,
                'message' => 'Success delete data!'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed delete data!'
            ], 500);
        }
    }
}
