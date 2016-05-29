<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->user()->is_admin) {
            return User::all();
        } elseif ($request->user()->is_manager) {
            return $request->user()->users()->get();
        }

        return $request->user();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);
        $this->validate($request,['working_hours' => 'required|numeric']);

        $user->update(['working_hours' => $request->input('working_hours')]);

        return $user;
    }
}
