new Vue({
    el: '#app',
    data: {
        title: "",
        keyword: "",
        showingOption: "All",
        tasks: [
            {
                isDone: false,
                title: 'First'
            },
            {
                isDone: true,
                title: 'Second'
            },
            {
                isDone: false,
                title: 'Third'
            }
        ]
    },
    computed: {
        tasksDone: function () {
            let tasksDone = this.tasks.filter(function(task) {
                return task.isDone === true;
            });
            return tasksDone.length;
        },
        percentsDone: function () {
            if (this.tasks.length > 0) {
                return Math.floor((this.tasksDone * 100) / this.tasks.length);
            } else {
                return 0;
            }
        }
    },
    methods: {
        markAsDone: function (task) {
            task.isDone = !task.isDone;
        },
        filterTasksByKeyword: function(keyword) {
            let tasks = this.tasks;
            switch (this.showingOption) {
                case 'Done':
                    tasks = this.tasks.filter(function (task) {
                        return task.isDone === true;
                    });
                    break;
                case 'Undone':
                    tasks = this.tasks.filter(function (task) {
                        return task.isDone === false;
                    });
                    break;
            }
            if (keyword) {
                tasks = tasks.filter(function(task) {
                    return task.title.toLowerCase() === keyword.toLowerCase();
                });
            }
            return tasks;
        },
        createNewTask: function(title) {
            if (title) {
                this.tasks.push({
                    isDone: false,
                    title: title
                });
                this.title = null;
            }
        },
        deleteTask: function(index) {
            this.tasks.splice(index, 1);
        }
    }
});
