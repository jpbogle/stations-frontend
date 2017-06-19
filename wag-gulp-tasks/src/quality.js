const gulp = require('gulp');
const linter = require('gulp-eslint');

const WAGTask = require('../util/WAGTask');

const lint = new WAGTask('lint', () =>
    gulp.src('./src/js/**/*.js')
        .pipe(linter())
        .pipe(linter.format())
        .pipe(linter.failAfterError()));

module.exports = {
    lint,
};
