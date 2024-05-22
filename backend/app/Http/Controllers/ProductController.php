<?php

namespace App\Http\Controllers;

use App\Models\Product;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Show all data.
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
     * Create data.
     */
    public function store(Request $request, Product $product)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'required|string',
                'price' => 'required|integer',
                'desc' => 'required|string',
                'size' => 'required|string',
                'stock' => 'required|integer',
                'pict' => 'required|image|mimes:jpeg,png,jpg',
                'categories_id' => 'required|integer',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $pict = null;

        if ($request->pict) {
            $fileName = $this->generateRandomString();
            $extention = $request->pict->getClientOriginalExtension();
            $pict = $fileName . '.' . $extention;

            Storage::putFileAs('public/pict', $request->pict, $pict);
        }

        $store = $product::create([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'pict' => $pict,
            'categories_id' => $request->categories_id,
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
     * Upload image if want update image.
     */
    public function updateimage(Request $request, Product $product,  $product_id)
    {
        $validator = Validator::make($request->all(), [
            'pict' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $pict = null;

        if ($request->pict) {
            $data = $product::where('id', $product_id)->first();

            if ($data->pict) {
                Storage::delete('public/pict/' . $data->pict);
            }

            $fileName = $this->generateRandomString();
            $extention = $request->pict->getClientOriginalExtension();
            $pict = $fileName . '.' . $extention;

            Storage::putFileAs('public/pict', $request->pict, $pict);
        }

        $update = $product::where('id', $product_id)->update([
            'pict' => $pict
        ]);

        $data = Product::where('id', $product_id)->get();

        if ($update) {
            return response()->json([
                'status' => true,
                'message' => 'Success upload picture!',
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed upload picture!'
            ], 404);
        }
    }

    /**
     * Show data by id.
     */
    public function show($product_id)
    {
        if (Product::where('id', $product_id)->exists()) {
            // fix the ambiguity by specifying the table name for the 'id' column
            $show = Product::join('categories', 'categories.id', '=', 'product.categories_id')
                ->where('product.id', $product_id) // specify 'product.id' to avoid ambiguity
                ->select('product.*', 'categories.*') // select the columns you need
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to find the data!',
                'data' => ''
            ], 404);
        }
    }

    /**
     * Update data.
     */
    public function update(Request $request, Product $product, $product_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'string',
                'price' => 'integer',
                'desc' => 'string',
                'size' => 'string',
                'stock' => 'integer',
                'categories_id' => 'integer',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $update = $product::where('id', $product_id)->update([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'categories_id' => $request->categories_id,
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
    public function destroy(Product $product, $product_id)
    {
        $data = $product::where('id', $product_id)->delete();

        if ($data->pict) {
            Storage::delete('public/pict/' . $data->pict);
        }

        $delete = $product::where('id', $product_id)->delete();

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

    /**
     * Generate random string for hashing request image filename.
     */
    protected function generateRandomString($length = 30)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = false; $i < $length; $i++) {
            $randomString .= $characters[rand(false,  $charactersLength - true)];
        }

        return $randomString;
    }
}
