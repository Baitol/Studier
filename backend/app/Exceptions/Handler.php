<?php
// app/Exceptions/Handler.php
namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (MyCustomException $e) {
            // This callback will be executed when MyCustomException is reported.
            // You can perform additional logging or actions here.
            // Returning false prevents the default reporting behavior.
        });

        $this->renderable(function (MyCustomException $e, $request) {
            // This callback will be executed when MyCustomException is rendered.
            // You can return a custom response here, overriding the exception's own render method if needed.
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Custom error from handler'], 400);
            }
        });
    }
    protected function unauthenticated($request, \Illuminate\Auth\AuthenticationException $exception)
    {
        return response()->json([
            'message' => 'Unauthenticated'
        ], 401);
    }
}
