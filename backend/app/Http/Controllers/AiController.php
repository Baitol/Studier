<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AiController extends Controller
{
    public function aiAsk(Request $request)
    {
        // $response = OpenAI::chat()->create([
        //     'model' => 'gpt-5-nano',
        //     'messages' => [
        //         ['role' => 'user', 'content' => $request->input('text')],
        //     ],
        //     'max_tokens' => 300,
        // ]);

        // return response()->json([
        //     'output' => $response->choices[0]->message->content,
        // ]);
        return json_encode([
            'output' => 'AI answer'
        ]);


    }
}
