var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');

gulp.task('default', function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts', 'typings/index.d.ts', 'typings/main.d.ts'],
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});