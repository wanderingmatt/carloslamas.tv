const gulp         = require('gulp'),

      autoprefixer = require('gulp-autoprefixer');
      concat       = require('gulp-concat');
      connect      = require('gulp-connect'),
      del          = require('del'),
      glob         = require('gulp-sass-glob'),
      merge        = require('merge-stream'),
      partials     = require('gulp-html-partial');
      sass         = require('gulp-sass');

var paths = {
  html: {
    src: './src/**/*.html',
    partials: './src/partials/',
    excludePartials: '!src/partials/*',
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
  fancybox: {
    src: './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'
  },
  javascripts: {
    src: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      './src/javascripts/scripts.js'
    ],
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
    .src([paths.html.src, paths.html.excludePartials])
    .pipe(partials({
      basePath: paths.html.partials
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
  var parsedStream = gulp
    .src(paths.stylesheets.src)
    .pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
  ;

  var unparsedStream = gulp
    .src(paths.fancybox.src)
  ;

  var mergedStream = merge(parsedStream, unparsedStream)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(connect.reload())
  ;

  return mergedStream;
};

      // './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'


function javascripts() {
  return gulp
    .src(paths.javascripts.src)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.javascripts.dest))
    .pipe(connect.reload())
};

const build = gulp.series(clean, gulp.parallel(html, images, stylesheets, javascripts));

exports.build = build;
exports.clean = clean;
exports.serve = serve

exports.default = gulp.series(build, serve, watch);
