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

		$name = $request->get('name');
		$completed = $request->get('completed');
		
		$completed = ($completed === 'true') ? true: false;

        $data['name'] = $name;
        $data['completed'] = $completed;

		\Log::info('data after:');
		\Log::info($data);

		$message = new Task;
		$message->fill($data);
		
		$result = $message->save();
	}

	public function update(Request $request) {
		$name = $request->get('name');
		$completed = $request->get('completed');
		$completed = ($completed === 'true') ? true: false;

		$data = array();

		$task = Task::findByName($name);

		\Log::info('task');
		\Log::info($task);

		$data['name'] = $name;
        $data['completed'] = $completed;

		$task->fill($data);

		$result = $task->save();	


		$task1 = Task::findByName($name);

		\Log::info('task after');
		\Log::info($task1);
	
	}

	public function delete(Request $request) {
		$name = $request->get('name');
		$task = Task::findByName($name);

		\Log::info('task');
		\Log::info($task);

		$task->delete();
	}
}
