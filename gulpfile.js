const gulp = require('gulp');
const wagTasks = require('./node_modules/wag-gulp-tasks');
// const debug = require('gulp-debug');

const { atomicTasks, compositeTasks, defaultTask } = wagTasks;

/**
 * Default WAG gulp task definitions:
 *
 *   Atomic tasks:
 *     - html: 'html'
 *     - assets: 'assets'
 *     - sass: 'sass'
 *     - bundle: 'bundle'
 *     - bundleWatch: 'bundle:watch'
 *     - lint: 'lint'
 *     - serve: 'serve'
 *     - watch: 'watch'
 *
 *   Composite tasks:
 *     - static => html, assets, sass
 *     - build => static, bundle
 *     - dev => static, bundle:watch
 *     - default => watch, dev, serve
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

/**
 * User defined gulp tasks go below this line.
 * Access a default task's gulp stream as follows:
 *
 *   gulp.task('myLint', () => {
 *       atomicTasks.lint.taskStream().pipe(debug({
 *           title: 'Discovered file: ',
 *           showFiles: true,
 *           minimal: true,
 *       }));
 *   });
 */
