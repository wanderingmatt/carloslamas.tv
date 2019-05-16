const gulp         = require('gulp'),

      autoprefixer = require('gulp-autoprefixer');
      connect      = require('gulp-connect'),
      del          = require('del'),
      glob         = require('gulp-sass-glob'),
      partials     = require('gulp-inject-partials'),
      sass         = require('gulp-sass');

var paths = {
  html: {
    src: './src/**/*.html',
    partials: 'partials/',
    partialsExclude: '!src/partials/*',
    dest: './dist'
  },
  images: {
    src: './src/images/**/*',
    dest: './dist/images'
  },
  stylesheets: {
    src: './src/stylesheets/**/*.scss',
    dest: './dist/stylesheets'
  },
  javascripts: {
    src: './src/javascripts/scripts.js',
    dest: './dist/javascripts'
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
  return del(['./dist']);
}

function watch(done) {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.stylesheets.src, stylesheets);
  gulp.watch(paths.javascripts.src, javascripts);
  done();
};

function html() {
  return gulp
    .src([
      paths.html.src,
      paths.html.partialsExclude
    ])
    .pipe(partials({
      end: '</@>',
      prefix: paths.html.partials,
      removeTags: true,
      start: '<@partial {{path}}>'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
};

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(connect.reload())
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

function javascripts() {
  return gulp
    .src(paths.javascripts.src)
    .pipe(gulp.dest(paths.javascripts.dest))
    .pipe(connect.reload())
};

const build = gulp.series(clean, gulp.parallel(html, images, stylesheets, javascripts));

exports.build = build;
exports.clean = clean;
exports.serve = serve

exports.default = gulp.series(build, serve, watch);
