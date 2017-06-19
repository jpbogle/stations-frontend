const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const fs = require('fs');
const runSequence = require('run-sequence');
const { log, colors } = require('gulp-util');

const WAGTask = require('../util/WAGTask');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));  // expects a .babelrc in the CWD, where `gulp` was invoked

/**
 * Configuration for Browserify bundling (one-time bundling, such as for production).
 */
const browserifyConfig = {
    entries: ['./src/js/index.js'],
    debug: true, // enable sourcemaps by default
    transform: [[babelify, babelrc]],
};

/**
 * Configuration for Watchify bundling (i.e. when you're developing and it re-compiles
 * on each change).
 */
const watchifyConfig = Object.assign({}, browserifyConfig, {
    cache: {},
    packageCache: {},
    plugin: [watchify],
});

/** Bundlers for each instance (both one-time and Watchify). */
const bundler = {
    browserify: browserify(browserifyConfig),
    watchify: browserify(watchifyConfig)
        .on('update', (changes) => {
            log('[%s] File(s) changed %s',
                colors.blue('watchify'),
                JSON.stringify(changes, null, 2)
            );
            runSequence(['bundle:watch']);
        }),
};

function minifyBundle(taskStream, done) {
    log('Minifying...');
    return taskStream.pipe(buffer())
        .pipe(uglify())
        .on('error', (err) => {
            log(`Uglify error\n${err.toString()}\n${err.codeFrame}`);
            done(err);
        });
}

/** Function that performs the actual bundling. */
function doBundle(done) {
    const isProd = !this.watchify;
    const NODE_ENV = isProd ? 'production' : 'development';
    process.env.NODE_ENV = NODE_ENV;
    log(`Set NODE_ENV to ${NODE_ENV}`);

    const taskStream = (isProd ? bundler.browserify : bundler.watchify)
        .bundle()
        .on('error', (err) => {
            log(`Browserify error\n${err.toString()}\n${err.codeFrame}`);
            isProd ? done(err) : done();
        })
        .pipe(source('bundle.js'));

    const bundledStream = isProd ? minifyBundle(taskStream, done) : taskStream;
    return bundledStream.pipe(gulp.dest('./dist/app/js'));
}

// Bundle task for single builds; no Watchify.
const bundle = new WAGTask('bundle', doBundle.bind({ watchify: false }));

// Bundle task for development mode (recompile on each change).
const bundleWatch = new WAGTask('bundle:watch', doBundle.bind({ watchify: true }));

module.exports = {
    bundle,
    bundleWatch,
};
