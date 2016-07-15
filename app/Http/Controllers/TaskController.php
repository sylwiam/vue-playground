<?php namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {

	public function getData() {
		$result = Task::all();

		// \Log::info('Tasks:');
		// \Log::info($result);

		return $result;
	}

	/**
	 * Create new task
	 *
	 * @param 	request $request - route request params
	 * @return 	object 	$result - task data
	 */
	public function create(Request $request) {
		$data = array();
		
		\Log::info('all requests');
		\Log::info($request->all());

        $data['name'] = $request->get('name');
        $data['completed'] = $request->get('completed');
        
        // $data['name'] = 'task 4';
        // $data['completed'] = false;

		// \Log::info('data hardcoded:');
		// \Log::info($data);

		$message = new Task;
		$message->fill($data);
		
		$result = $message->save();
	}

	public function edit(Request $request) {
		$name = $request->get('name');
		$task = Task::findByName($name);

		$task->fill($data);

		$result = $task->save();		
	}

	public function delete(Request $request) {
		$name = $request->get('name');
		$task = Task::findByName($name);

		\Log::info('task');
		\Log::info($task);

		$task->delete();
	}
}
