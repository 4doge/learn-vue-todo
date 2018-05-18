new Vue({
    el: '#app',
    data: {
        title: '',
        keyword: '',
        showingOption: 'All',
        taskPriority: '1',
        sortPriority: 'asc',
        tasks: [
            {
                uuid: '67c5e6a0-9037-4dec-95f8-41c544a8ce62',
                isDone: false,
                title: 'First',
                priority: 2
            },
            {
                uuid: 'e799211c-662e-4d4a-8184-9a17d0add41b',
                isDone: true,
                title: 'Second',
                priority: 1
            },
            {
                uuid: '97911934-2a93-44ce-b0c0-674352758a9b',
                isDone: false,
                title: 'Third',
                priority: 3
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
            let sortPriority = this.sortPriority;
            switch (this.showingOption) {
                case 'Done':
                    tasks = tasks.filter(function (task) {
                        return task.isDone === true;
                    });
                    break;
                case 'Undone':
                    tasks = tasks.filter(function (task) {
                        return task.isDone === false;
                    });
                    break;
            }
            if (keyword) {
                tasks = tasks.filter(function(task) {
                    return task.title.toLowerCase() === keyword.toLowerCase();
                });
            }
            tasks = tasks.slice().sort(function(task1, task2) {
                if (sortPriority === 'asc') {
                    return task1.priority - task2.priority;
                } else {
                    return task2.priority - task1.priority;
                }
            });
            return tasks;
        },
        createNewTask: function() {
            if (this.title) {
                this.tasks.push({
                    isDone: false,
                    title: this.title,
                    uuid: this.generateUUID(),
                    priority: this.taskPriority
                });
                this.taskPriority = 1;
                this.title = null;
            }
        },
        deleteTask: function(task) {
            let index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
        },
        generateUUID: function() {
            let uuid = '', i, random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-'
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }
            return uuid;
        }
    }
});
