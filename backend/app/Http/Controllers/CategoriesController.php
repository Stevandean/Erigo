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
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $store = $categories::create([
            'categories_name' => $request->categories_name
        ]);

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
            ], 404);
        }
    }

    /**
     * Show data by id.
     */
    public function show(Categories $categories, $id)
    {
        if ($categories::where('id', $id)->exists()) {
            $show = $categories::where('categories.id', '=', $id)->first();

            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
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
     * Update data.
     */
    public function update(Request $request, Categories $categories, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $update = $categories::where('id', $id)->update([
            'categories_name' => $request->categories_name
        ]);

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
            ], 404);
        }
    }

    /**
     * Delete data.
     */
    public function destroy(Categories $categories, $id)
    {
        $delete = $categories::where('id', $id)->delete();

        if ($delete) {
            return response()->json([
                'status' => true,
                'message' => 'Success delete data!'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed delete data!'
            ], 404);
        }
    }
}
