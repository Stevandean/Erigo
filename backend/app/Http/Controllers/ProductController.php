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
        // Retrieves all products from the database and returns them in a JSON response.
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
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'required|string',
                'price' => 'required|string',
                'desc' => 'required|string',
                'size' => 'required|string',
                'stock' => 'required|integer',
                'pict' => 'image|mimes:jpeg,png,jpg',
                'categories_id' => 'required|integer',
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Processes the image upload, if provided.
        $pict = null;
        if ($request->hasFile('pict')) {
            $fileName = $this->generateRandomString();
            $extension = $request->file('pict')->getClientOriginalExtension();
            $pict = $fileName . '.' . $extension;
            $request->file('pict')->storeAs('public/pict', $pict);
        }

        // Creates a new product with the provided data including the image filename.
        $store = $product::create([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'pict' => $pict,
            'categories_id' => $request->categories_id,
        ]);

        // Returns a success message and the created product data if creation was successful, otherwise an error message.
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
     * Upload image if want to update image.
     */
    public function updateimage(Request $request, Product $product, $product_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make($request->all(), [
            'pict' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Processes the image upload, if provided.
        $pict = null;
        if ($request->hasFile('pict')) {
            $data = $product::where('id', $product_id)->first();

            // Deletes the existing image file associated with the product, if it exists.
            if ($data->pict) {
                Storage::delete('public/pict/' . $data->pict);
            }

            // Generates a random filename for the uploaded image.
            $fileName = $this->generateRandomString();
            $extension = $request->file('pict')->getClientOriginalExtension();
            $pict = $fileName . '.' . $extension;

            // Stores the uploaded image with the generated filename.
            Storage::putFileAs('public/pict', $request->pict, $pict);
        }

        // Updates the product with the new image filename.
        $update = $product::where('id', $product_id)->update([
            'pict' => $pict
        ]);

        // Retrieves the updated product data.
        $data = Product::where('id', $product_id)->first();

        // Returns a success message and the updated product data if update was successful, otherwise an error message.
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
            ], 500);
        }
    }

    /**
     * Show data by id.
     */
    public function show($product_id)
    {
        // Checks if a product with the specified ID exists.
        if (Product::where('id', $product_id)->exists()) {
            // Retrieves the product data along with related category information.
            $show = Product::join('categories', 'categories.id', '=', 'product.categories_id')
                ->where('product.id', $product_id)
                ->select('product.*', 'categories.*')
                ->first();

            // Returns the product data in a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the product is not found.
            return response()->json([
                'success' => false,
                'message' => 'Failed to find the data!',
                'data' => ''
            ], 500);
        }
    }

    /**
     * Update data.
     */
    public function update(Request $request, int $product_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'product_name' => 'string',
                'price' => 'string',
                'desc' => 'string',
                'size' => 'string',
                'stock' => 'integer',
                'categories_id' => 'integer',
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Updates the product with the specified ID using the constructed data.
        $update = Product::where('id', $product_id)->update([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'desc' => $request->desc,
            'size' => $request->size,
            'stock' => $request->stock,
            'categories_id' => $request->categories_id
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
    public function destroy(int $product_id)
    {
        // Fetches the product first based on the provided ID.
        $product = Product::find($product_id);

        // Checks if the product exists.
        if (!$product) {
            // Returns an error message if the product is not found.
            return response()->json([
                'status' => false,
                'message' => 'Product not found!'
            ], 404);
        }

        // Deletes the associated picture of the product, if it exists.
        if ($product->pict) {
            Storage::delete('public/pict/' . $product->pict);
        }

        // Deletes the product from the database.
        $delete = $product->delete();

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

    /**
     * Generate random string for hashing request image filename.
     */
    protected function generateRandomString($length = 30)
    {
        // Generates a random string with the specified length using alphanumeric characters.
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomIndex = rand(0, $charactersLength - 1);
            $randomString .= $characters[$randomIndex];
        }

        return $randomString;
    }
}
