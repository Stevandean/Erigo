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
        // Retrieves all users and returns them as a JSON response.
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
        // Checks if the user with the specified ID exists.
        if ($users::where('id', $users_id)->exists()) {
            // Retrieves the user data with the specified ID.
            $show = $users::where('users.id', $users_id)->first();

            // Returns the retrieved data as a JSON response.
            return response()->json([
                'success' => true,
                'message' => 'Success show data!',
                'data' => $show
            ], 200);
        } else {
            // Returns an error message if the user is not found.
            return response()->json([
                'success' => false,
                'message' => 'Failed find the data!',
                'data' => ''
            ], 500);
        }
    }

    /**
     * Upload image if want to update image.
     */
    public function updateimage(Request $request, Users $users, $user_id)
    {
        // Validates the incoming request data.
        $validator = Validator::make($request->all(), [
            'pict' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $pict = null;

        if ($request->pict) {
            $data = $users::where('id', $user_id)->first();

            if ($data->pict) {
                // Delete the existing picture if it exists.
                Storage::delete('public/user/' . $data->pict);
            }

            // Generate a random filename and store the uploaded image.
            $fileName = $this->generateRandomString();
            $extention = $request->pict->getClientOriginalExtension();
            $pict = $fileName . '.' . $extention;

            Storage::putFileAs('public/user', $request->pict, $pict);
        }

        // Update the user's profile picture in the database.
        $update = $users::where('id', $user_id)->update([
            'pict' => $pict
        ]);

        // Retrieves the updated user data.
        $data = Users::where('id', $user_id)->first();

        // Returns a success message and the updated data if successful, otherwise an error message.
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
     * Update data.
     */
    public function update(Request $request, int $user_id)
    {
        // Validates the incoming request data.
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

        // If validation fails, returns the validation errors as a JSON response.
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Validates the password field separately if present.
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

        // Constructs the data to be updated based on the request data.
        $dataToUpdate = [
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'role' => $request->role
        ];

        // Hashes the password if included in the request.
        if ($request->has('password')) {
            $dataToUpdate['password'] = Hash::make($request->password); // Hash the password
        }

        // Updates the user data in the database.
        $update = Users::where('id', $user_id)->update($dataToUpdate);

        // Returns a success message and the number of affected rows if successful, otherwise an error message.
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
    public function destroy(int $users_id)
    {
        // Deletes the user data with the specified ID.
        $delete = Users::where('id', $users_id)->delete();

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
