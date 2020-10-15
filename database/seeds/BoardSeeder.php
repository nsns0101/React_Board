<?php

use Illuminate\Database\Seeder;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json_board = json_decode(file_get_contents(public_path('json/board.json')), true);

        for($i = 0; $i < count($json_board); $i++){
            \App\Board::create([
                'user_id' => $json_board["$i"]["user_id"],
                'category_id' => $json_board["$i"]["category_id"],
                'title' => $json_board["$i"]["title"],
                'content' => $json_board["$i"]["content"],
                // 'view_count' => $json_board["$i"]["view_count"],
            ]);
        }
    }
}
