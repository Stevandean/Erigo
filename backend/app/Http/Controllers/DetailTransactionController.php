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
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'required|integer',
                'product_id' => 'required|integer',
                'quantity' => 'required|string',
                'total_price' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $store = $detail_transaction::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price

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
    public function show($detail_transaction_id)
    {
        if (DetailTransaction::where('id', $detail_transaction_id)->exists()) {
            // fix the ambiguity by specifying the table name for the 'id' column
            $show = DetailTransaction::join('transaction', 'transaction.id', '=', 'detail_transaction.transaction_id')
                ->join('product', 'product.id', '=', 'detail_transaction.product_id')
                ->where('detail_transaction.id', $detail_transaction_id) // specify 'detail_transaction_id.id' to avoid ambiguity
                ->select('detail_transaction.*', 'transaction.*', 'product.*') // select the columns you need
                ->first();

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
    public function update(Request $request, DetailTransaction $detail_transaction, $detail_transaction_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'transaction_id' => 'integer',
                'product_id' => 'integer',
                'quantity' => 'string',
                'total_price' => 'string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $update = $detail_transaction::where('id', $detail_transaction_id)->update([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price
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
    public function destroy(DetailTransaction $detail_transaction, $detail_transaction_id)
    {
        $delete = $detail_transaction::where('id', $detail_transaction_id)->delete();

        if ($delete) {
            return response()->json([
                'status' => true,
                'message' => 'Success delete data!'
            ], 288);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed delete data!'
            ], 404);
        }
    }
}
