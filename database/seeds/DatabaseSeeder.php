<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('users')->delete();
        $user = ['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => Hash::make('secret'), 'is_admin' => 1];
        User::create($user);

        $user = ['name' => 'Manager', 'email' => 'manager@gmail.com', 'password' => Hash::make('secret'), 'is_manager' => 1];
        $user = User::create($user);
        $managerId = $user->id;

        $user = ['name' => 'Taher Dameh', 'email' => 'tdameh@gmail.com', 'password' => Hash::make('secret'), 'manager_id' => $managerId];
        User::create($user);

        $user = ['name' => 'User', 'email' => 'user@gmail.com', 'password' => Hash::make('secret'), 'manager_id' => $managerId];
        User::create($user);

        Model::reguard();
    }
}
