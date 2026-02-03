<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'article_id' => 'required|exists:articles,id',
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'article_id' => $this->route('id'),
        ]);
    }
}
