<?php

namespace App\Http\Controllers;

use App\Models\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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
        if ($users::where('id', $users_id)->exists()) {
            $show = $users::where('users.id', $users_id)->first();

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
     * Upload image if want update image.
     */
    public function updateimage(Request $request, Users $users,  $user_id)
    {
        $validator = Validator::make($request->all(), [
            'pict' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $pict = null;

        if ($request->pict) {
            $data = $users::where('id', $user_id)->first();

            if ($data->pict) {
                Storage::delete('public/user/' . $data->pict);
            }

            $fileName = $this->generateRandomString();
            $extention = $request->pict->getClientOriginalExtension();
            $pict = $fileName . '.' . $extention;

            Storage::putFileAs('public/user', $request->pict, $pict);
        }

        $update = $users::where('id', $user_id)->update([
            'pict' => $pict
        ]);

        $data = $users::where('id', $user_id)->first();

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
     * Update data.
     */
    public function update(Request $request, Users $users, $user_id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'string',
                'address' => 'string',
                'phone' => 'string',
                'email' => 'string|max:255',
                'role' => 'string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->has('password')) {
            $passwordValidator = Validator::make(
                $request->only('password'),
                [
                    'password' => 'string|min:8',
                ]
            );

            if ($passwordValidator->fails()) {
                return response()->json($passwordValidator->errors());
            }
        }

        $dataToUpdate = [
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'role' => $request->role
        ];

        if ($request->has('password')) {
            $dataToUpdate['password'] = Hash::make($request->password); // Hash the password
        }

        $update = $users::where('id', $user_id)->update($dataToUpdate);

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
    public function destroy(Users $users, $users_id)
    {
        $delete = $users::where('id', $users_id)->delete();

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
