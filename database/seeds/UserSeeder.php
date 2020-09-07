<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json_user = json_decode(file_get_contents(public_path('json/user.json')), true);

        for($i = 0; $i < count($json_user); $i++){
            \App\User::create([
                'email' => $json_user["$i"]["email"],
                'password' => bcrypt('password'),
                'name' => $json_user["$i"]["name"],
                'birth' => rand(1960, 2005) . '/' . rand(1,12) . '/' . rand(1,28),
                'gender' => $json_user["$i"]["gender"],
                'phone' => $json_user["$i"]["phone"],
                'confirm_code' => null,
            ]);
        }
    }
}
