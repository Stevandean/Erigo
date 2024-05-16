<?php

namespace App\Http\Controllers;

use App\Models\Product;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Show all data
     */
    public function index(Product $product)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $product::all()
        ], 200);
    }

    /**
     * create data
     */

    public function store(Request $request, Product $product)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'required',
                'price' => 'required',
                'desc' => 'required',
                'size' => 'required',
                'stock' => 'required',
                'pict' => 'required',
                'rating' => 'required',
                'categories_id' => 'required',
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $store = $product::create([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'pict' => $request->pict,
            'rating' => $request->rating,
            'categories_id' => $request->categories_id,
        ]);

        $data = $product::where('product_name', '=', $request->product_name)->get();
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
     * show data by id
     */


    public function show(Product $product, $product_id)
    {
        if ($product::where('product_id', $product_id)->exists()) {
            $data = $product::join('categories', 'categories.categories_id', '=', 'product.categories_id')->where('product_id', $product_id)->get();

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
    public function update(Request $request, Product $product, $product_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'required',
                'price' => 'required',
                'desc' => 'required',
                'size' => 'required',
                'stock' => 'required',
                'pict' => 'required',
                'rating' => 'required',
                'categories_id' => 'required',
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $update = DB::table('product')->where('product_id', '=', $product_id)->update([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'pict' => $request->pict,
            'rating' => $request->rating,
            'categories_id' => $request->categories_id,
        ]);

        $data = $product::where('product_id', '=', $product_id)->get();
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
        $delete = DB::table('product')->where('product_id', '=', $id)->delete();

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
