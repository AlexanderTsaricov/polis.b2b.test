<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 5; $i++) { 
            $article = new Article([
                'title' => fake()->unique()->sentence(2),
                'content' => fake()->text(2000)
            ]);

            $article->save();
        }
    }
}
