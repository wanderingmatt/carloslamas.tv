const gulp             = require('gulp'),

      autoprefixer     = require('gulp-autoprefixer'),
      cache            = require('gulp-cache'),
      concat           = require('gulp-concat'),
      connect          = require('gulp-connect'),
      del              = require('del'),
      ghPages          = require('gulp-gh-pages'),
      imagemin         = require('gulp-imagemin'),
      imageminPngquant = require('imagemin-pngquant'),
      merge            = require('merge-stream'),
      sassGlob         = require('gulp-sass-glob'),
      sass             = require('gulp-sass');

var paths = {
  html: {
    src: './src/**/*.html',
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

function clean() {
  return del(['./dist/**/*', '!./dist/CNAME']);
}

function clear() { // Busts the image cache, if necessary.
  return cache.clearAll();
}

function serve(done) {
  connect.server({
    root: './dist',
    livereload: true
  });
  done();
};

function watch(done) {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.stylesheets.src, stylesheets);
  gulp.watch(paths.javascripts.src, javascripts);
  done();
};

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
};

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(cache(imagemin([
      imageminPngquant({
        speed: 1,
        quality: [0.7, 0.95]
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
    ])))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(connect.reload())
};

function stylesheets() {
  var parsedStream = gulp
    .src(paths.stylesheets.src)
    .pipe(sassGlob())
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

function javascripts() {
  return gulp
    .src(paths.javascripts.src)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.javascripts.dest))
    .pipe(connect.reload())
};

function deploy() {
  return gulp
    .src('./dist/**/*')
    .pipe(ghPages())
};

exports.clean = clean;
exports.clear = clear;

const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    images,
    javascripts,
    stylesheets
  )
);

exports.build = build;

exports.deploy = gulp.series(
  build,
  deploy
);

exports.default = gulp.series(
  build,
  serve,
  watch
);
