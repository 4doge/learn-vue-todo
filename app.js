new Vue({
    el: '#app',
    data: {
        title: "",
        keyword: "",
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
            if (keyword) {
                return this.tasks.filter(function(task) {
                    return task.title.toLowerCase() === keyword.toLowerCase();
                });
            } else {
                return this.tasks;
            }
        },
        createNewTask: function(title) {
            if (title) {
                this.tasks.push({
                    isDone: false,
                    title: title
                });
                this.title = null;
            }
        }
    }
});
