<?php

Route::get('/', function() {
	return view('home');
});

Route::get('tasks', function() {
	return view('tasks');
});
Route::get('task/get-all', array('as' => 'tasks-get-all', 'uses' => 'TaskController@getData'));
Route::post('task/create', array('as' => 'tasks-create', 'uses' => 'TaskController@create'));
Route::post('task/update', array('as' => 'tasks-create', 'uses' => 'TaskController@update'));
Route::post('task/delete', array('as' => 'tasks-create', 'uses' => 'TaskController@delete'));
