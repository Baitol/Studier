<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;


use Gemini\Enums\ModelVariation;
use Gemini\GeminiHelper;
use Gemini\Laravel\Facades\Gemini;

use App\Services\DeepSeekService;
class AiController extends Controller
{

    private DeepSeekService $deepseek;

    public function __construct(DeepSeekService $deepseek)
    {
        $this->deepseek = $deepseek;
    }
    public function aiAsk(Request $request)
    {
        $ai_answer = $this->deepseek->chat(
            $request->get('text')
        );
        return json_encode([
            'output' => $ai_answer
        ]);


    }
}
