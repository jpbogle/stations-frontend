/* global describe before after it */

const gulp = require('gulp');
const assert = require('yeoman-assert');
const { expect } = require('chai');
const fs = require('fs');

const { ls, rmrf, runTask } = require('./test-helpers');
const { staticFileList } = require('./fixtures');

// register all the tasks
require('./gulpfile');

describe('tasks/assets', () => {
    describe('static', () => {
        before((done) => {
            rmrf('./dist');
            assert.noFile('./dist');
            runTask('static')
                .then((res) => {
                    expect(res.exitCode).to.equal(0);
                    expect(res.stdout).to.contain("Starting 'static'...");
                    done();
                })
                .catch(done);
        });

        it('should have subtasks', () => {
            expect(gulp.tasks.static.dep).to.deep.equal(['html', 'assets', 'sass']);
        });

        it('should have copied all static assets from src/ to dist/', (done) => {
            // static assets exist, no side-effects produced
            assert.file(staticFileList);
            ls('./dist')
                .then(files => {
                    assert.objectContent(files.sort(), staticFileList.sort());
                    done();
                })
                .catch(done);
        });

        it('should have executed the html task', () => {
            assert.fileContent(
                './dist/app/index.html',
                fs.readFileSync('./src/index.html', 'utf-8')
            );
        });

        it('should have executed the assets task', () => {
            assert.jsonFileContent(
                './dist/app/assets/quotes.json',
                require('./src/assets/quotes.json')
            );
        });

        it('should have compiled sass to css', () => {
            const compiledSass = `.some-sass .a-nested-class-selector {
  height: 100%; }`;

            assert.fileContent(
                './dist/app/css/style.css',
                compiledSass
            );
        });
    });
});
