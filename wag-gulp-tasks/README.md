# WAG Gulp Tasks [![View source on BitBucket](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/novartisnibr/wag-gulp-tasks)

Current version: `0.1.0`

This library is an effort to externalize the build stack of WAG generated applications, without sacrificing too much flexibility for those requiring custom build logic. It allows the consuming application to override and pipe streams into/out of the default tasks.

## Usage

Install from the NIBR NPM registry as follows (included in all WAG generated apps since `v0.3.0`)

```javascript
npm install --save-dev wag-gulp-tasks
```

Example gulpfile showing usage of the default tasks required by all WAG applications (included in all WAG generated apps since `v0.3.0`)

```javascript
const gulp = require('gulp'); // `gulp` is a peer dependency
const wagTasks = require('./index');

const { atomicTasks, compositeTasks, defaultTask } = wagTasks;

/**
 * Default WAG gulp task definitions:
 */

atomicTasks.html.register();
atomicTasks.assets.register();
atomicTasks.sass.register();

gulp.task(...compositeTasks.static);

atomicTasks.bundle.register();
atomicTasks.bundleWatch.register();

gulp.task(...compositeTasks.build);

atomicTasks.lint.register();
atomicTasks.serve.register();
atomicTasks.watch.register();

gulp.task(...compositeTasks.dev);

defaultTask.register();
```

It's important to note that the tasks listed above are required by the default WAG configuration. If modifications are needed, tasks can be overidden. In such cases it is recommended the user read the source code of the task to avoid removing important logic required to keep WAG apps running.

## Atomic tasks vs. Composite tasks

The difference between the two is that `atomicTasks` are independent `gulp` tasks, while `compositeTasks` are `gulp` tasks that invoke one or more `atomicTasks`.

All `atomicTasks` come with the following external properties:

- `register`: `func` A function with no arguments and no return statement. It will register the gup task under the name specified below in the `API` section
- `taskStream`: `func` The task implementation, a function that takes no arguments and returns a stream of modified files. It can be used as input to downstream functions.

`compositeTasks` are nothing more than arrays where the first argument is the name of the task, and the second an array of all subtasks to run. Note from the WAG `gulpfile.js` that `atomicTasks` must be registered before they can be used as part of any `compositeTask`. See `API` section for more details.

The last export of the library is the `defaultTask` which is a special version of an `atomicTask` that registers the `gulp` `default` task. See `API` section for more details.

## API

Following is the list of all available WAG gulp tasks. The `compositeTasks` are registered under the name in the `compositeTask` column.

### > atomicTasks

| atomicTask    | registered name  | description |
| ------------- | ---------------- | ---------------- |
| `html`        | `'html'`         | copies all `*.html` files in the `src` folder directly into `dist/app`
| `assets`      | `'assets'`       | copies all files in the `src/assets` folder directly into `dist/app/assets`
| `sass`        | `'sass'`         | runs `gulpSass()` on the file `src/sass/style.s*ss` and stores it in `dist/app/css`
| `bundle`      | `'bundle'`       | runs the production mode bundling of the application using `browserify` with transforms `babelify` and the `.babelrc` file local to the app, and minifies the code; see below for `browserifyConfig`
| `bundleWatch` | `'bundle:watch'` | same as `bundle` but will not minify the code and will run `browserify` with the `watchify` config (see below)
| `lint`        | `'lint'`         | runs `gulp-eslint` on `src/js/**/*.js` files and spits out a report, failing on errors
| `serve`       | `'serve'`        | initiates a `browser-sync` server on port `3000`, with a `baseDir: './dist/app'`
| `watch`       | `'watch'`        | see `watch` object below


#### `browserifyConfig`
```javascript
const babelrc = JSON.parse(fs.readFileSync('./.babelrc')); // babel plugins to use
const babelify = require('babelify');

const browserifyConfig = {
    entries: ['./src/js/index.js'],
    debug: true, // enable sourcemaps by default
    transform: [[babelify, babelrc]],
}
```

#### `watchifyConfig`
```javascript
const watchify = require('watchify');

const watchifyConfig = Object.assign({}, browserifyConfig, {
    cache: {},
    packageCache: {},
    plugin: [watchify],
});
```

#### `watch` task: creates the following watches, invoking gulp task on changes matching the glob
```javascript
gulp.watch('./src/*.html', ['html']);
gulp.watch('./src/assets/**/*', ['assets']);
gulp.watch('./src/sass/*.s*ss', ['sass']);
gulp.watch('./dist/**/*', server.reload);
```

### > compositeTasks

All `compositeTasks` must have their corresponding `atomicTasks` registered before attempting to register.

| compositeTask | list of atomicTasks    |
| ------------- | ------------------------ |
| `static`      | `[html, assets, sass]`   |
| `build`       | `[static, bundle]`       |
| `dev`         | `[static, bundle:watch]` |
| `default`     | `[watch, dev, serve]`    |

By default, gulp runs taks in parallel. The only exception to this is `default` which runs `watch, dev and serve` in sequence.
