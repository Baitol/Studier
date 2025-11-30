<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. Adjust these settings to match your front-end.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'], // paths — які URL на бекенді дозволені CORS (маємо /sanctum/csrf-cookie та API).

    'allowed_methods' => ['*'], // allowed_methods — дозволені HTTP-методи (* = всі).

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173')), // allowed_origins — список фронтенд-доменів, яким дозволено робити запити.

    'allowed_origins_patterns' => [], 

    'allowed_headers' => ['*'], // allowed_headers — які заголовки дозволені (* = всі).

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // supports_credentials — чи можна відправляти cookie/credentials (має бути true для Sanctum).

];
