<?php

Route::prefix('/api')->group(function () {

  Route::post('/sendData', 'Acme\ContactForm\Classes\ContactFormController@send');

});

