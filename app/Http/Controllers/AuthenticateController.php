<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AuthenticateController extends Controller
{


    /**
     * Return a JWT
     *
     * @return Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could not create token'], 500);
        }
        // if no errors are encountered we can return a JWT
        $user = $request->user();
        return response()->json(compact('token', 'user'));
    }


    /**
     * Singup and Return a JWT
     *
     * @return Response
     */
    public function signup(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        try {
            if (User::where('email', $request->email)->first()) {
                return response()->json(['error' => 'User already exists'], 401);
            }
            $user = User::create([
                'email' => $request->email, 
                'password' => \Hash::make($request->password), 
                'working_hours' => 0
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('token', 'user'));
    }

    /**
     * logout
     */
    public function logout(Request $request)
    {
        JWTAuth::invalidate($request->token);
    }
}
