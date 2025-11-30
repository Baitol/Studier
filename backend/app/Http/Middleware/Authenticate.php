<?php
// app/Http/Middleware/Authenticate.php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // For API requests, return null to prevent redirection and let the exception handler return a JSON response
        if ($request->expectsJson()) {
            return null;
        }

        // For specific public pages, return null
        $allowedRoutes = ['public-page', 'another-public-page'];
        if (in_array($request->path(), $allowedRoutes)) {
            return null;
        }

        // Default redirection to the login route
        return route('login');
    }
}
