<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 30; $i++) { 
            $comment = new Comment([
                'author_name' => fake()->name(),
                'content' => fake()->text(200),
                'article_id' => Article::inRandomOrder()->first()->id
            ]);

            $comment->save();
        }
    }
}
