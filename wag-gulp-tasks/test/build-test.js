/* global describe before after it */

const gulp = require('gulp');
const assert = require('yeoman-assert');
const { expect } = require('chai');

const { ls, rmrf, runTask } = require('./test-helpers');
const { testTimeout, staticFileList, bundleFileList } = require('./fixtures');

// register all the tasks
require('./gulpfile');

describe('tasks/build', function () {
    this.timeout(testTimeout);

    describe('build', () => {
        before(() => {
            rmrf('./dist');
            assert.noFile('./dist');
        });

        it('should have subtasks', () => {
            expect(gulp.tasks.build.dep).to.deep.equal(['static', 'bundle']);
        });

        it('should produce all files from `static` and `bundle`', (done) => {
            runTask('build')
                .then(res => {
                    expect(res.exitCode).to.equal(0);

                    const buildFileList = new Set([...staticFileList, ...bundleFileList]);
                    assert.file([...buildFileList]);

                    ls('./dist').then(files => {
                        assert.objectContent(files, buildFileList);
                        done();
                    })
                    .catch(done);
                })
                .catch(done);
        });
    });
});
