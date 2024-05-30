<?php

namespace App\Http\Controllers;

use App\Models\Categories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    /**
     * Show all data.
     */
    public function index(Categories $categories)
    {
        // Fetches all categories from the database and returns them in a JSON response.
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $categories::all()
        ], 200);
    }

    /**
     * Create data.
     */
    public function store(Request $request, Categories $categories)
    {
        // Validates the incoming request to ensure 'categories_name' is present and is a string.
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'required|string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Creates a new category with the validated 'categories_name' from the request.
        $store = $categories::create([
            'categories_name' => $request->categories_name
        ]);

        // Returns a success message and the created category data if creation was successful, otherwise an error message.
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
    public function show(Categories $categories, $categories_id)
    {
        // Checks if a category with the given ID exists in the database.
        if ($categories::where('id', $categories_id)->exists()) {
            // Fetches the category data if it exists.
            $show = $categories::where('categories.id', $categories_id)->first();

            // Returns the category data in a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the category is not found.
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
    public function update(Request $request, Categories $categories, $categories_id)
    {
        // Validates the incoming request to ensure 'categories_name' is a string.
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Updates the category with the given ID with the new 'categories_name' from the request.
        $update = $categories::where('id', $categories_id)->update([
            'categories_name' => $request->categories_name
        ]);

        // Returns a success message and the number of affected rows if the update was successful, otherwise an error message.
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
    public function destroy(Categories $categories, $categories_id)
    {
        // Deletes the category with the given ID from the database.
        $delete = $categories::where('id', $categories_id)->delete();

        // Returns a success message if the deletion was successful, otherwise an error message.
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
