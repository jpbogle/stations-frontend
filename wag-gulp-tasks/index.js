const runSequence = require('run-sequence');
const WAGTask = require('./util/WAGTask');

// task definitions
const { html, assets, sass } = require('./src/assets');
const { bundle, bundleWatch } = require('./src/bundle');
const { lint } = require('./src/quality');
const { serve } = require('./src/serve');
const { watch } = require('./src/watch');

function getTaskName(taskItem) {
    return taskItem instanceof WAGTask ? taskItem.taskName : taskItem;
}

const atomicTasks = { html, assets, sass, bundle, bundleWatch, lint, serve, watch };

// produces a map like { static: [ 'static', [ 'html', 'assets', 'sass' ] ] }
const compositeTasks = [
    ['static', [html, assets, sass]],
    ['build', ['static', bundle]],
    ['dev', ['static', bundleWatch]],
    ['default', ['dev', watch, serve]],
].reduce((acc, [name, subtasks]) => {
    acc[name] = [name, subtasks.map(getTaskName)];
    return acc;
}, {});


const defaultTask = new WAGTask('default', (cb) => {
    const subtasks = compositeTasks.default[1];
    runSequence(...subtasks.concat(cb));
});

module.exports = { atomicTasks, compositeTasks, defaultTask };
