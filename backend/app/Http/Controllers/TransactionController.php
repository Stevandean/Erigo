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
        // Retrieves all products from the database and returns them in a JSON response.
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
        // Validates the incoming request data.
        $validator = Validator::make($request->all(), [
            'payment_method' => 'required|string',
            'status_payment' => 'required|string',
            'status_courier' => 'required|string',
            'users_id' => 'required|integer'
        ]);

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Processes the receipt number transaction
        $receipt_number = $this->generateRandomString();

        // Creates a new transaction record based on the provided request data.
        $store = $transaction::create([
            'receipt_number' => $receipt_number,
            'payment_method' => $request->payment_method,
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier,
            'users_id' => $request->users_id
        ]);

        // Returns a success message and the created transaction data if creation was successful, otherwise an error message.
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
    public function show($transaction_id)
    {
        // Checks if a product with the specified ID exists.
        if (Transaction::where('id', $transaction_id)->exists()) {
            // fix the ambiguity by specifying the table name for the 'id' column
            $show = Transaction::join('users', 'users.id', '=', 'transaction.users_id')
                ->where('transaction.id', $transaction_id) // specify 'transaction.id' to avoid ambiguity
                ->select('transaction.*', 'users.*') // select the columns you need
                ->first();

            // Returns the transaction data in a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the transaction is not found.
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
    public function update(Request $request, int $transaction_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make(
            $request->all(),
            [
                'status_payment' => 'string',
                'status_courier' => 'string'
            ]
        );

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Constructs the data to be updated based on the provided request data.
        $update = Transaction::where('id', $transaction_id)->update([
            'status_payment' => $request->status_payment,
            'status_courier' => $request->status_courier
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
    public function destroy(int $transaction_id)
    {
        // Deletes the transaction record with the specified ID.
        $delete = Transaction::where('id', $transaction_id)->delete();

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
    protected function generateRandomString($length = 10)
    {
        // Generates a random string with the specified length using alphanumeric characters.
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
