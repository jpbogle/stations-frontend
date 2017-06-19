const BrowserSync = require('browser-sync');

const WAGTask = require('../util/WAGTask');

const server = BrowserSync.create();

/** Start the BrowserSync server. */
const serveTask = () =>
    server.init({
        port: 3000,
        server: {
            baseDir: './dist/app',
        },
        ghostMode: false,
    });

const serve = new WAGTask('serve', serveTask);

module.exports = {
    serve,
    server,
};
