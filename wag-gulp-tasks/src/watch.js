const gulp = require('gulp');
const { server } = require('./serve');

const WAGTask = require('../util/WAGTask');

const watch = new WAGTask('watch', () => {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/assets/**/*', ['assets']);
    gulp.watch('./src/sass/*.s*ss', ['sass']);
    gulp.watch('./dist/**/*', server.reload);
});

module.exports = {
    watch,
};
