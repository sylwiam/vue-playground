<?php

Route::get('/', function() {
	return view('home');
});

Route::get('tasks', function() {
	return view('tasks');
});
Route::get('api/tasks', array('as' => 'tasks-get-all', 'uses' => 'TaskController@getData'));
Route::post('api/tasks/create', array('as' => 'tasks-create', 'uses' => 'TaskController@create'));
