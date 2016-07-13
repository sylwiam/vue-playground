new Vue({
	el: '#tasks',
	data: {
		tasks: [
			{ name: 'Fix mongo server', completed: false },
			{ name: 'hotfix for checksystem', completed: false },
			{ name: 'have some chocolate', completed: false },
			{ name: 'have some MORE chocolate', completed: false },
			{ name: 'Make Deniz do some work ;)', completed: false }
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
				url: 'api/tasks',
				type: 'get',
				async: false,
				success: function(responseData) {
					temp = responseData;
				},
				error: function (request, status, error) {
					// alert(request.responseText);
				}
			});

			// if (typeof temp !== 'undefined') {
			// 	this.$set('tasks', temp);
				
			// 	console.log('tasks New');
			// 	console.log(this.tasks);
			// }

		},
		addTask: function(e) {
			e.preventDefault();

			if (! this.newTask) return;

			this.tasks.push({
				body: this.newTask, 
				completed: false
			});

			// inputData = this.newTask;
			inputData = {
				name: 'Do Something',
				completed: false
			}
			console.log('inputData:');
			console.log(inputData);

			// jQuery ajax
			$.ajax({
				url: 'api/tasks/create',
				type: 'post',
				data: inputData,
				async: false,
				success: function(responseData) {
					// 
				}
			});

			this.newTask = '';


		},
		removeTask: function(task) {
			this.tasks.$remove(task);
		},
		editTask: function(task) {
			this.removeTask(task);
			this.newTask = task.body;
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
		}
 
	}
})
