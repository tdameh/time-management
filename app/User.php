<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * get the user tasks
     */
    public function tasks()
    {
        if ($this->is_admin) {
            return Task::with(['user'=>function($query){
                $query->select('id','name');
            }]);
        } elseif ($this->is_manager) {
            $users = $this->users->lists('id')->toArray();
            array_push($users, $this->id);
            return Task::whereIn('user_id', $users)->with(['user'=>function($query){
                $query->select('id','name');
            }]);
        }

        return $this->hasMany(Task::class);
    }

    /*
     * create a task
     */
    public function createTask($input)
    {
        if (!isset($input['user_id'])) $input['user_id'] = $this->id;

        return Task::create($input);
    }


    /*
     * get the user's staff
     */
    public function users()
    {
        return $this->hasMany(User::class, 'manager_id');
    }

}
