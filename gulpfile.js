var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var source = require('vinyl-source-stream');
var webpack = require('webpack-stream');

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

var tslint = require('gulp-tslint');

// default task
gulp.task('default', ['transpile'], function() {

});

// transpilation task from typescript to es5 javascript
gulp.task('transpile', function() {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist'));
});

// copies all the static files from the demo to the build directories
gulp.task('demo-copy', function() {
  gulp.src(['./demo/index.html', './demo/images/**/*'], { base: './demo' })
    .pipe(gulp.dest('docs'));
});

// transpiles all the demo scss files
gulp.task('demo-scss', function() {
  return gulp.src(['./demo/**/*.{scss,sass}'])
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest('docs'));
});

// generates all the demo files in the build directory
gulp.task('demo', ['default', 'demo-copy', 'demo-scss'], function() {
  return gulp.src('demo/index.tsx')
    .pipe(webpack( require('./webpack/webpack.demo.js') ))
    .pipe(gulp.dest('docs/'));
});

// lints all the typescript source files
gulp.task('tslint', function() {
  return gulp.src(['./**/*.ts', './**/*.tsx', '!node_modules/**/*', '!typings/**/*'])
    .pipe(tslint({
      formatter: 'verbose',
    }))
    .pipe(tslint.report());
});