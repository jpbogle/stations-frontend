const gulp = require('gulp');

class WAGTask {
    constructor(taskName, taskImpl) {
        this.taskName = taskName;
        this.taskStream = taskImpl;
    }

    register() {
        if (gulp.tasks[this.taskName]) {
            throw new Error(`Gulp task '${this.taskName}' already registered!`);
        } else {
            return gulp.task(this.taskName, this.taskStream);
        }
    }
}

module.exports = WAGTask;
