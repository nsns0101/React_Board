<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //외래키 설정을 초기화
        //만들어 지는 순서에 따라 오류가 날 수 있기 때문에
        if (config('databases.default') !== 'sqlite') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
        }

        App\User::truncate();
        App\Category::truncate();
        App\Board::truncate();
        App\Comment::truncate();
        App\Vote::truncate();

        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(BoardSeeder::class);

    }
}
