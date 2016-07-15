console.log('hello');
new Vue({
	el: '#tasks',
	data: {
		tasks: [],
		newTask: ''

	},
	ready : function() {  
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
				
				this.$set('tasks', temp);

				console.log('tasks before fix');
				console.log(this.tasks);
				
				this.fixBoolData(temp);
				this.$set('tasks', temp);
				
				console.log('tasks after fix');
				console.log(this.tasks);
			}

		},
		addTask: function(e) {
			e.preventDefault();

			if (! this.newTask) return;

			inputData = {
				name: this.newTask,
				completed: false
			}
			console.log('inputData:');
			console.log(inputData);

			this.sendAjaxPost('task/create', inputData);
			this.fetchTasks();
			
			this.newTask = '';

		},
		removeTask: function(task) {
			inputData = {
				name: task.name,
			}
			console.log('inputData:');
			console.log(inputData);

			this.sendAjaxPost('task/delete', inputData);
			this.fetchTasks();
		},
		editTask: function(task) {
			this.removeTask(task);
			this.newTask = task.name;
			this.$$.newTaskEl.focus();
		},
		toglleTaskCompletions: function(task) {
			task.completed = ! task.completed;

			inputData = {
				name: task.name,
				completed: task.completed
			}

			this.sendAjaxPost('task/update', inputData);
			this.fetchTasks();
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
 		sendAjaxPost: function(ajaxUrl, inputData) {
 			// jQuery ajax
			$.ajax({
				url: ajaxUrl,
				type: 'post',
				data: inputData,
				async: false,
				success: function(responseData) {
					// 
				}
			});
 		}
	}
})
