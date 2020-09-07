<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $json_category = json_decode(file_get_contents(public_path('json/category.json')), true);

        for($i = 0; $i < count($json_category); $i++){
            \App\Category::create([
                'category' => $json_category["$i"]["category"]
            ]);
        }
    }
}
