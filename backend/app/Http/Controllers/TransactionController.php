<?php

namespace App\Http\Controllers;

use App\Models\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Show all data
     */
    public function index(Transaction $transaction)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $transaction::all()
        ], 200);
    }

    /**
     * Create data
     */
    public function store(Request $request, Transaction $transaction)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'receipt_number' => 'required',
                'payment_method' => 'required',
                'status_payment' => 'required',
                'status_courier' => 'required',
                'users_id' => 'required'

            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $store = $transaction::create([
            'receipt_number' => $request->receipt_number,
            'payment_method' => $request->payment_method,
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier,
            'users_id' => $request->users_id
        ]);

        $data = $transaction::where('receipt_number', '=', $request->receipt_number)->get();
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
    public function show(Transaction $transaction, $transaction_id)
    {
        if ($transaction::where('transaction_id', $transaction_id)->exists()) {
            $data = $transaction::where('transaction.transaction_id', '=', $transaction_id)->get();

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
    public function update(Request $request, Transaction $transaction, $transaction_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'receipt_number' => 'required',
                'payment_method' => 'required',
                'status_payment' => 'required',
                'status_courier' => 'required',
                'users_id' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $update = DB::table('transaction')->where('transaction_id', '=', $transaction_id)->update([
            'receipt_number' => $request->receipt_number,
            'payment_method' => $request->payment_method,
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier,
            'users_id' => $request->users_id
        ]);

        $data = $transaction::where('transaction_id', '=', $transaction_id)->get();
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
        $delete = DB::table('transaction')->where('transaction_id', '=', $id)->delete();

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
