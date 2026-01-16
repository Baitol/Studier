<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DeepSeekService
{
    protected string $baseUrl = 'https://api.deepseek.com/v1';

    public function chat(string $message): string
    {
        $response = Http::withToken(config('services.deepseek.key'))
            ->post($this->baseUrl . '/chat/completions', [
                'model' => 'deepseek-chat',
                'messages' => [

                    [
                        'role' => 'system',
                        'content' => 'You are an AI engine. You must strictly follow ALL instructions. You are not allowed to improvise.
                        RULES:
                            1. Follow the USER PROMPT literally.
                            2. Do NOT add anything extra.
                            3. Do NOT explain your reasoning.
                            4. Do NOT apologize.
                            5. Output MUST match the format exactly.
                            6. If you cannot comply, output: INVALID_REQUEST
                            7. Text length must be less 50 smbols
                        '
                    ],
                    [
                        'role' => 'user',
                        'content' => $message
                    ]
                ],
            ]);

        if ($response->failed()) {
            throw new \Exception($response->body());
        }

        return $response->json('choices.0.message.content');
    }
}
