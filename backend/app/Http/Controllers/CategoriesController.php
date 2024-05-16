<?php

namespace App\Http\Controllers;

use App\Models\Categories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{
    /**
     * Show all data
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
     * Create data
     */
    public function store(Request $request, Categories $categories)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $store = $categories::create([
            'categories_name' => $request->categories_name
        ]);

        $data = $categories::where('categories_name', '=', $request->categories_name)->get();
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
    public function show(Categories $categories, $categories_id)
    {
        if ($categories::where('categories_id', $categories_id)->exists()) {
            $data = $categories::where('categories.categories_id', '=', $categories_id)->get();

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
    public function update(Request $request, Categories $categories, $categories_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'categories_name' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $update = DB::table('categories')->where('categories_id', '=', $categories_id)->update([
            'categories_name' => $request->categories_name
        ]);

        $data = $categories::where('categories_id', '=', $categories_id)->get();
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
        $delete = DB::table('categories')->where('categories_id', '=', $id)->delete();

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
