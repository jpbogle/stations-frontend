/* global describe before after it */

const assert = require('yeoman-assert');
const { expect } = require('chai');
const fs = require('fs');
const { rmrf, runTask } = require('./test-helpers');

const { testTimeout } = require('./fixtures');

// register all the tasks
require('./gulpfile');

describe('tasks/quality', function () {
    this.timeout(testTimeout);

    describe('lint', () => {
        before(() => {
            rmrf('./dist');
            assert.noFile('./dist');
        });

        after(() => {
            fs.unlinkSync('./src/js/lint-fail.js');
        });

        it('should run without error', (done) => {
            runTask('lint')
                .then(res => {
                    expect(res.exitCode).to.equal(0);
                    expect(res.stdout).to.contain("Starting 'lint'...");
                    expect(res.stdout).to.contain("Finished 'lint'");
                    expect(res.stdout).to.not.contain('Failed');
                    done();
                })
                .catch(done);
        });

        it('should return non-zero on lint failure', (done) => {
            const lintFailFile = `var x = 43;
console.log(x)
{ x}`;
            fs.writeFileSync('./src/js/lint-fail.js', lintFailFile, 'utf-8');

            runTask('lint')
                .catch(res => { // catch because this is intended to fail
                    expect(res.code).to.equal(1);
                    expect(res.stdout).to.contain("Starting 'lint'...");
                    expect(res.stdout).to.contain('7 problems (6 errors, 1 warning)');
                    expect(res.stdout).to.contain("'lint' errored");
                    expect(res.stdout).to.contain('Failed');
                    done();
                })
                .catch(done);
        });
    });
});
