<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class DetailTransactionController extends Controller
{
    /**
     * Show all data.
     */
    public function index(DetailTransaction $detail_transaction)
    {
        // Retrieves all detail transactions from the database and returns them in a JSON response.
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $detail_transaction::all()
        ], 200);
    }

    /**
     * Create data.
     */
    public function store(Request $request, DetailTransaction $detail_transaction)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'required|integer',
                'product_id' => 'required|integer',
                'quantity' => 'required|string',
                'total_price' => 'required|string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Creates a new detail transaction with the provided data.
        $store = $detail_transaction::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price
        ]);

        // Returns a success message and the created detail transaction data if creation was successful, otherwise an error message.
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
    public function show($detail_transaction_id)
    {
        // Checks if a detail transaction with the specified ID exists.
        if (DetailTransaction::where('id', $detail_transaction_id)->exists()) {
            // Retrieves the detail transaction data along with related transaction and product information.
            $show = DetailTransaction::join('transaction', 'transaction.id', '=', 'detail_transaction.transaction_id')
                ->join('product', 'product.id', '=', 'detail_transaction.product_id')
                ->where('detail_transaction.id', $detail_transaction_id)
                ->select('detail_transaction.*', 'transaction.*', 'product.*')
                ->first();

            // Returns the detail transaction data in a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the detail transaction is not found.
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
    public function update(Request $request, int $detail_transaction_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'integer',
                'product_id' => 'integer',
                'quantity' => 'string',
                'total_price' => 'string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Updates the detail transaction with the specified ID using the provided data.
        $update = DetailTransaction::where('id', $detail_transaction_id)->update([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price
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
    public function destroy(int $detail_transaction_id)
    {
        // Deletes the detail transaction with the specified ID from the database.
        $delete = DetailTransaction::where('id', $detail_transaction_id)->delete();

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
