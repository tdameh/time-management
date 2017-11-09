<?php

namespace App\Policies;

use App\User;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given user can update the given user.
     *
     * @param  User  $user
     * @param  User  $user
     * @return bool
     */
    public function update(User $user, User $userToUpdate)
    {
        if ($user->is_admin) {
            return true;
        } elseif ($user->is_manager) {
            return $user->id === $userToUpdate->manager_id || $user->id === $userToUpdate->id;
        }

        return $user->id === $userToUpdate->id;
    }
}