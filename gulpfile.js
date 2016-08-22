var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

var tsConfig = {
  jsx: "react",
  module: "commonjs",
  moduleResolution: "node",
  noImplicitAny: true,
  target: "es5",
  experimentalDecorators: true,
  typescript: require("typescript"),
};

var tslint = require('gulp-tslint');
var clean = require('gulp-clean');

function tsifyBuild(entries, output, destination) {
  return browserify({
    basedir: '.',
    debug: true,
    entries: entries,
    cache: {},
    packageCache: {},
  })
  .plugin(tsify, { typescript: require('typescript') })
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

gulp.task('transpile', function() {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(tsConfig))
    .pipe(gulp.dest('src'));
});

gulp.task('pretest', function() {
  return gulp.src(['test/**/*.ts', 'test/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(tsConfig))
    .pipe(gulp.dest('test'));
});

gulp.task('posttest', function() {
  return gulp.src(['test/**/*.js', 'src/**/*.js'])
    .pipe(clean());
});