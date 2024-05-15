<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DetailTransactionController extends Controller
{
   /**
     * Show all data
     */
    public function index(DetailTransaction $DetailTransaction)
    {
        return response()->json([
            'success' => true,
            'message' => 'Show all datas',
            'data' => $DetailTransaction::all()
        ], 200);
    }
     /**
     * Create data
     */
    public function store(Request $request, DetailTransaction $DetailTransaction)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'quantity' => 'required',
                'total_price' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $store = $categories::create([
            'quantity' => $request->quantity,
            'total_price' => $request->total_price

        ]);

        $data = $categories::where('quantity', '=', $request->quantity)->get();
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
    public function show(DetailTransaction $DetailTransaction, $detail_transaction_id)
    {
        if ($DetailTransaction::where('detail_transaction_id', $detail_transaction_id)->exists()) {
            $data = $DetailTransaction::where('DetailTransaction.detail_transaction_id', '=', $detail_transaction_id)->get();

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
    public function update(Request $request, DetailTransaction $DetailTransaction, $detail_transaction_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'quantity' => 'required',
                'total_price' => 'required'
            ]
        );

        if ($validator->fails()) {
            return Response()->json($validator->errors());
        }

        $update = DB::table('detail_transaction')
            ->where('detail_transaction_id', '=', $detail_transaction_id)
            ->update([
                'quantity' => $request->quantity,
                'total_price' => $request->total_price
            ]);

        $data = $categories::where('detail_transaction_id', '=', $detail_transaction_id)->get();
        if ($update) {
            return Response()->json([
                'status' => 1,
                'message' => 'Success updating data !',
                'data' => $data
            ]);
        } else {
            return Response()->json([
                'status' => 0,
                'message' => 'Failed updating data !'
            ]);
        }
    }
     /**
     * Delete data
     */
    public function destroy($id)
    {
        $delete = DB::table('detail_transaction')
            ->where('detail_transaction_id', '=', $id)
            ->delete();

        if ($delete) {
            return Response()->json([
                'status' => 1,
                'message' => 'Success delete data !'
            ]);
        } else {
            return Response()->json([
                'status' => 0,
                'message' => 'Failed delete data !'
            ]);
        }
    }
}

