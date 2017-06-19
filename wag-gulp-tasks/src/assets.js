const gulp = require('gulp');
const gulpSass = require('gulp-sass');

const WAGTask = require('../util/WAGTask');

const html = new WAGTask('html', () =>
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/app')));

const assets = new WAGTask('assets', () =>
    gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/app/assets')));

const sass = new WAGTask('sass', () =>
    gulp.src('./src/sass/style.s*ss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./dist/app/css')));

module.exports = {
    html,
    assets,
    sass,
};
