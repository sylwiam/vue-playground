<?php

Route::get('/', function() {
	return view('blog');
});

Route::get('api/messages', array('as' => 'messages-get-all', 'uses' => 'CommentController@getData'));

// get('api/messages', function() {
// 	return App\Models\Message::all();
// });

Route::post('api/messages/create', array('as' => 'messages-create', 'uses' => 'CommentController@create'));

Route::get('home-new', function() {
	return view('home-new');
});
