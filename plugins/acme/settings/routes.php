<?php
use Cms\Models\ThemeData;
use Cms\Classes\Theme;
use Illuminate\Http\Request;
use Acme\Settings\Models\Feedback;

Route::prefix('/api')->group(function () {

  Route::get('/cars', function () {
    return response()->file(resource_path('cars.json'));
  });

  Route::post('/feedback', function (Request $request) {
    $limit = $request->get('limit');
    $offset = $request->get('offset');
    return Feedback::where('status', 1)->skip($offset)->take($limit)->get();
  });

});


