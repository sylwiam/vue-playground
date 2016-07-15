console.log('hello');
new Vue({
	el: '#tasks',
	data: {
		// test Task data:
		tasks: [
			{ name: 'Fix mongo server', completed: false },
			{ name: 'Hotfix for checksystem', completed: false },
			{ name: 'Attend scrum meeting', completed: false },
			{ name: 'Have some chocolate', completed: false },
			{ name: 'Do sprint planning with the team', completed: false },
			{ name: 'Have some MORE chocolate', completed: false },
			
		],
		newTask: ''

	},
	ready : function() {       
		console.log('vueModel is ready');   
		this.fetchTasks();
    },
	computed: {
		completions: function() {
			return this.tasks.filter(function(task) {
				return task.completed;
			});
		},
		remaining: function() {
			return this.tasks.filter(function(task) {
				return ! task.completed;
			});
		}
	},
	filters: {
		inProcess: function(tasks) {
			return tasks.filter(function(task) {
				return ! task.completed;
			});
		}
	},
	methods: {
		fetchTasks: function () {
			console.log('fetchTasks');

			$.ajax({
				url: 'task/get-all',
				type: 'get',
				async: false,
				success: function(responseData) {
					temp = responseData;
				},
				error: function (request, status, error) {
					// alert(request.responseText);
				}
			});

			if (typeof temp !== 'undefined') {
				this.fixBoolData(temp);
				console.log('tasks New');
				this.$set('tasks', temp);
				
				console.log('tasks New');
				console.log(this.tasks);
			}

		},
		addTask: function(e) {
			e.preventDefault();

			if (! this.newTask) return;

			// inputData = this.newTask;
			inputData = {
				name: this.newTask,
				completed: false
			}
			console.log('inputData:');
			console.log(inputData);

			// jQuery ajax
			$.ajax({
				url: 'task/create',
				type: 'post',
				data: inputData,
				async: false,
				success: function(responseData) {
					// 
				}
			});

			this.fetchTasks();
			
			this.newTask = '';

		},
		removeTask: function(task) {
			console.log('removeTask()');
			// this.tasks.$remove(task);

			inputData = {
				name: task.name,
			}
			console.log('inputData:');
			console.log(inputData);

			// jQuery ajax
			$.ajax({
				url: 'task/delete',
				type: 'post',
				data: inputData,
				async: false,
				success: function(responseData) {
					// 
				}
			});

			this.fetchTasks();

		},
		editTask: function(task) {
			this.removeTask(task);
			this.newTask = task.name;
			this.$$.newTaskEl.focus();
		},
		toglleTaskCompletions: function(task) {
			task.completed = ! task.completed;
		},
		completeAll: function(task) {
			return this.tasks.forEach(function(task) {
				task.completed = true;
			});
		},
		clearCompleted: function() {
			this.tasks = this.tasks.filter(function(task) {
				return ! task.completed;
			});
		},
		fixBoolData: function(tasks) {
			return tasks.forEach(function(task) {
				if (task.completed == "false" || task.completed == "0") {
					task.completed = false;
				} else if (task.completed == "true" || task.completed == "1") {
					task.completed = true;
				}
			});
		},
 
	}
})
