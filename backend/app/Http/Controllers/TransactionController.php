<?php

namespace App\Http\Controllers;

use App\Models\Transaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Show all data.
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
     * Create data.
     */
    public function store(Request $request, Transaction $transaction)
    {
        $validator = Validator::make($request->all(), [
            'payment_method' => 'required|string',
            'status_payment' => 'required|string',
            'status_courier' => 'required|string',
            'users_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $receipt_number = $this->generateRandomString();

        $store = $transaction::create([
            'receipt_number' => $receipt_number,
            'payment_method' => $request->payment_method,
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier,
            'users_id' => $request->users_id
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
    public function show($id)
    {
        if (Transaction::where('id', $id)->exists()) {
            // fix the ambiguity by specifying the table name for the 'id' column
            $show = Transaction::join('users', 'users.id', '=', 'transaction.users_id')
                ->where('transaction.id', $id) // specify 'transaction.id' to avoid ambiguity
                ->select('transaction.*', 'users.*') // select the columns you need
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
    public function update(Request $request, Transaction $transaction, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'status_payment' => 'string',
                'status_courier' => 'string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $update = $transaction::where('id', $id)->update([
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier
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
    public function destroy(Transaction $transaction, $id)
    {
        $delete = $transaction::where('id', $id)->delete();

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
    protected function generateRandomString($length = 10)
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomIndex = rand(0, $charactersLength - 1);
            $randomString .= $characters[$randomIndex];
        }

        return $randomString;
    }
}
