const childProcess = require('child_process');
const { exec } = require('child-process-promise');
const fs = require('fs');
const rr = require('recursive-readdir');
const rmrf = require('rimraf');

module.exports = {
    /**
     * async `ls` helper function
     */
    ls: (path) => rr(path),

    /**
     * sync rm -rf helper function
     */
    rmrf: rmrf.sync,

    /**
     * sync filesize helper function
     */
    getSize: (path) => fs.statSync(path).size,

    /**
     * an async helper function to run tasks in a subshell,
     * helps determine non-zero exit code on failure
     * resolves after completion, rejects on error
     */
    runTask: function runTask(task) {
        return exec(`npm run test-${task}`)
            .then(result => {
                const { stdout, stderr } = result;
                const exitCode = result.childProcess.exitCode;

                return { stdout, stderr, exitCode };
            });
    },

    /**
     * a more involved runTask function, that automatically kills
     * the subprocess after a specified (or default) timeout
     * resolves with stdout & stderr output streams, and and exit code iff completed before timeout
     * rejects on error
     */
    runAndKillTask: function runAndKillTask(task, taskTimeout = 5000) {
        return new Promise((res, rej) => {
            const signal = 'SIGTERM';
            const stdout = [];
            const stderr = [];
            const handle = childProcess.spawn('npm', ['run', `test-${task}`]);

            function makeResponse(code) {
                return {
                    stdout: stdout.join(''),
                    stderr: stderr.join(''),
                    exitCode: code,
                };
            }

            handle.stdout.on('data', (data) => stdout.push(data));
            handle.stderr.on('data', (data) => stderr.push(data));
            handle.on('error', (err) => rej(err));
            handle.on('close', (code) => res(makeResponse(code)));

            setTimeout(() => {
                handle.kill(signal); // does not kill child's child processes... problem?
                res(makeResponse(signal));
            }, taskTimeout);
        });
    },
};
