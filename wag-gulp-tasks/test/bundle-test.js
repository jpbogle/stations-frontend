/* global describe before after it */

const assert = require('yeoman-assert');
const { expect } = require('chai');
const fs = require('fs');

const { ls, rmrf, getSize, runTask, runAndKillTask } = require('./test-helpers');
const { testTimeout, bundleFileList } = require('./fixtures');

// register all the tasks
require('./gulpfile');

describe('tasks/bundle', function () {
    const taskTimeout = 3000;
    this.timeout(testTimeout);

    describe('bundle:watch', () => {
        before((done) => {
            rmrf('./dist');
            assert.noFile('./dist');
            runAndKillTask('bundle:watch', taskTimeout)
                .then((res) => {
                    expect(res.exitCode).to.equal('SIGTERM');
                    expect(res.stdout).to.contain("Starting 'bundle:watch'...");
                    expect(res.stdout).to.contain('Set NODE_ENV to development');
                    expect(res.stdout).to.contain('Finished');
                    done();
                })
                .catch(done);
        });

        after(() => {
            fs.createReadStream('./src/js/index.bak')
                .pipe(fs.createWriteStream('./src/js/index.js'));
        });

        it('should have produced proper scaffolding and bundle.js', (done) => {
            ls('./dist')
                .then(files => {
                    assert.file(bundleFileList);
                    assert.objectContent(files.sort(), bundleFileList.sort());

                    const bundleSize = getSize('./dist/app/js/bundle.js');
                    assert(bundleSize > 0);
                    done();
                })
                .catch(done);
        });

        it('should gracefully fail to bundle', (done) => {
            fs.writeFileSync('./src/js/index.js', 'require("./myNonExistingFile.js")', 'utf-8');

            runAndKillTask('bundle:watch', taskTimeout)
                .then(res => {
                    expect(res.exitCode).to.equal('SIGTERM');
                    expect(res.stdout).to.contain('Browserify error');
                    expect(res.stdout).to.contain("Cannot find module './myNonExistingFile.js'");
                    done();
                })
                .catch(done);
        });

        it('should gracefully fail to parse', (done) => {
            fs.writeFileSync('./src/js/index.js', 'const asdashfgakjlhdas', 'utf-8');

            runAndKillTask('bundle:watch', taskTimeout)
                .then(res => {
                    expect(res.exitCode).to.equal('SIGTERM');
                    expect(res.stdout).to.contain('SyntaxError');
                    expect(res.stdout).to.contain('Unexpected token (1:22) while parsing');
                    expect(res.stdout).to.contain('1 | const asdashfgakjlhdas');
                    done();
                })
                .catch(done);
        });

        // TODO: assert sourcemaps creation
    });

    describe('bundle', () => {
        let wholeBundleSize = -1;
        let minifiedBundleSize = -1;

        before((done) => {
            rmrf('./dist');
            assert.noFile('./dist');
            runAndKillTask('bundle:watch', taskTimeout)
                .then(res1 => {
                    expect(res1.exitCode).to.equal('SIGTERM');
                    expect(res1.stdout).to.contain('Finished');
                    wholeBundleSize = getSize('./dist/app/js/bundle.js');

                    return runTask('bundle').then(res2 => {
                        expect(res2.exitCode).to.equal(0);
                        expect(res2.stdout).to.contain('Set NODE_ENV to production');
                        expect(res2.stdout).to.contain('Minifying...');
                        expect(res2.stdout).to.contain('Finished');
                        minifiedBundleSize = getSize('./dist/app/js/bundle.js');
                        done();
                    });
                })
                .catch(done);
        });

        after(() => {
            fs.createReadStream('./src/js/index.bak')
                .pipe(fs.createWriteStream('./src/js/index.js'));
        });

        it('should have produced proper scaffolding and bundle.js', (done) => {
            ls('./dist')
                .then(files => {
                    assert.file(bundleFileList);
                    assert.objectContent(files.sort(), bundleFileList.sort());
                    done();
                })
                .catch(done);
        });

        it('should have minified the bundle', () => {
            expect(wholeBundleSize).to.be.above(0);
            expect(minifiedBundleSize).to.be.above(0);
            expect(minifiedBundleSize).to.be.below(wholeBundleSize);
        });

        it('should exit non-zero on failing to bundle', (done) => {
            fs.writeFileSync('./src/js/index.js', 'require("./myNonExistingFile.js")', 'utf-8');

            runTask('bundle')
                .catch(res => { // catch because this is intended to fail
                    expect(res.code).to.equal(1);
                    expect(res.stdout).to.contain("Starting 'bundle'...");
                    expect(res.stdout).to.contain('Browserify error');
                    expect(res.stdout).to.contain("Cannot find module './myNonExistingFile.js'");
                    expect(res.stdout).to.contain("'bundle' errored");
                    done();
                })
                .catch(done);
        });
    });
});
