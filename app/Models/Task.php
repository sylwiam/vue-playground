<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {

	protected $table = 'task';
	protected $fillable = ['name', 'owner', 'completed'];

	/**
	 * Gets Task based on given task name
	 *
	 * @param 	string 	$name - task name
	 * @return 	object 	$result - task data
	 */
	public static function findByName($name) {
		$result = Task::where('name', $name)
			->first();

		return $result;
	}

}
