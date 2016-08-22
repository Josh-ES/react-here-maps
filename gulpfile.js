var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var tslint = require('gulp-tslint');

function tsifyBuild(entries, output, destination) {
  return browserify({
    basedir: '.',
    debug: true,
    entries: entries,
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  .bundle()
  .pipe(source(output))
  .pipe(gulp.dest(destination));
}

gulp.task('default', function() {
  return tsifyBuild(['src/main.ts'], 'bundle.js', 'dist');
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
  return tsifyBuild(['demo/index.tsx'], 'demo.js', 'build');
});

gulp.task('tslint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'verbose',
    }))
    .pipe(tslint.report());
});

gulp.task('pretest', function() {
  return gulp.src(['test/**/*.ts', 'test/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('test'));
});