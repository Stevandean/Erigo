<?php

namespace App\Http\Controllers;

use App\Models\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    /**
     * Show all data.
     */
    public function index(Users $users)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success show all data!',
            'data' => $users::all()
        ], 200);
    }

    /**
     * Show data by id.
     */
    public function show(Users $users, $users_id)
    {
        if ($users::where('users_id', $users_id)->exists()) {
            $data = $users::where('users.users_id', '=', $users_id)->get();

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
     * Delete data.
     */
    public function destroy(Users $users, $users_id)
    {
        $delete = $users::table('users')->where('users_id', $users_id)->delete();

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
}
