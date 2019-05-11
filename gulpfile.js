const gulp         = require('gulp'),

      autoprefixer = require('gulp-autoprefixer');
      connect      = require('gulp-connect'),
      del          = require('del'),
      glob         = require('gulp-sass-glob'),
      sass         = require('gulp-sass');

var paths = {
  stylesheets: {
    src: './src/stylesheets/**/*.scss',
    dest: './dist/stylesheets'
  }
};

function serve(done) {
  connect.server({
    root: './dist',
    livereload: true
  });
  done();
};

function clean() {
  return del(['./dist/stylesheets']);
}

function watch() {
  gulp.watch(paths.stylesheets.src, stylesheets);
};

function stylesheets() {
  return gulp
    .src(paths.stylesheets.src)
    .pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(connect.reload())
};

const build = gulp.series(clean, gulp.parallel(stylesheets));

exports.build = build;
exports.clean = clean;
exports.serve = serve

exports.default = gulp.series(build, serve, watch);
