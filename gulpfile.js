var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sass = require('gulp-sass');

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