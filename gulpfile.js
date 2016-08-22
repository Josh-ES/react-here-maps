var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('lib', function() {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('release'));
});

gulp.task('copy', function() {
  gulp.src('./demo/index.html')
    .pipe(gulp.dest('build'));
})

gulp.task('demo-scss', function() {
  return gulp.src(['./demo/**/*.{scss,sass}'])
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('demo', ['default', 'copy', 'demo-scss'], function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['demo/index.tsx'],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('demo.js'))
    .pipe(gulp.dest('./build'));
});