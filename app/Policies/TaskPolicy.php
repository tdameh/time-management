<?php

namespace App\Policies;

use App\User;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    private $request;

    /*
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Determine if the given user can create a task for a user.
     *
     * @param  User  $user
     * @param  Task  $task
     * @return bool
     */
    public function store(User $user)
    {
        if (!User::find($this->request->user_id)) \App::abort(404, 'User not found');

        if ($user->is_admin) {
            return true;
        } elseif ($user->is_manager) {
            $users = $user->users->lists('id')->toArray();
            array_push($users, $user->id);
            return in_array($this->request->user_id, $users);
        } else {
            return $this->request->user_id === $user->id;
        }

        return false;
    }

    /**
     * Determine if the given user can update or delete the given task.
     *
     * @param  User  $user
     * @param  Task  $task
     * @return bool
     */
    public function updateDelete(User $user, Task $task)
    {
        if ($user->is_admin) {
            return true;
        } elseif ($user->is_manager) {
            return $user->id === $task->user->manager_id || $user->id === $task->user_id;
        }

        return $user->id === $task->user_id;
    }

}
