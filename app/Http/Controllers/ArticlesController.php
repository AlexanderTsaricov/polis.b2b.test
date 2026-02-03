<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticlesCreateRequest;
use App\Http\Requests\ArticlesGetRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ArticlesGetRequest $request)
    {
        $request->validated();
        $limit = $request->query('limit', 10);
        $page  = $request->query('page', 1);

        $articles = Article::paginate($limit, ['*'], 'page', $page);

        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(ArticlesCreateRequest $request)
    {
        $data = $request->validated();
        try {
            $article = Article::create($data);

            if (! $article) {
                return response()->json(['success' => false, 'message' => 'Create failed'], 400);
            }

            return response()->json(['success' => true, 'data' => $article], 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['success' => false, 'message' => 'Server error'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
