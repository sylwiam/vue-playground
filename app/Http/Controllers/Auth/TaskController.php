<?php namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class TaskController extends Controller {

	public function index() {
		return view('tasks');
	}
}



		