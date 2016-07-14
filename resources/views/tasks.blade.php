<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>To-Do</title>
		<script src="https://code.jquery.com/jquery-3.0.0.min.js" integrity="sha256-JmvOoLtYsmqlsWxa7mDSLMwa6dZ9rrIdtrrVYRnDRH0=" crossorigin="anonymous"></script> 
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        <link rel="stylesheet" href="{!! asset('css/tasks.css') !!}" type="text/css">
        <script type="text/javascript"  src="{{ URL::asset('/vendor/vue/vue.min.js') }}"></script>
        <script type="text/javascript"  src="{{ URL::asset('/vendor/vue/vue-resource.min.js') }}"></script>

	</head>
	<body>
		<div class="container">
			<div id="tasks">
				<div v-show="remaining.length">
					<h1>To-Do (@{{remaining.length}})</h1>
					<ol class="list-group">
						<li v-repeat="task: tasks | inProcess" 
							class="list-group-item">
							<span v-on="dblclick: editTask(task)">@{{task.name}}</span>
							<button v-on="click: removeTask(task)" class="remove">&#10007;</button>
							<button v-on="click: toglleTaskCompletions(task)" class="complete">&#10004;</button>
						</li>
					</ol>
				</div>
				<form v-on="submit: addTask">
					<div class="form-group">
						<input v-model="newTask" v-el="newTaskEl"
							class="form-control" 
							placeholder="I need to..." >
						</input>
					</div>
					<button class="btn btn-primary">Add Task</button>
					<button v-on="click: completeAll" class="btn btn-default">Complete All</button>
				</form>
				<div v-if="completions.length">
					<h2>Completed (@{{ completions.length }})</h2>
					<ol class="list-group">
						<li v-repeat="task: tasks | filterBy true in completed" 
							class="list-group-item">
							<s><span>@{{task.name}}</span></s>
							<button v-on="click: toglleTaskCompletions(task)" class="remove">&#10007;</button>
						</li>
					</ol>
					<button v-on="click: clearCompleted" class="btn btn-danger">Clear Completed</button>
				</div>
<!-- 				<div>
					<pre>@{{ $data | json}}</pre>
				</div> -->
			</div>
		</div>	
		<script type="text/javascript"  src="{{ URL::asset('js/tasks.js') }}"></script>
	</body>
</html>
