var gulp         = require('gulp');

var connect      = require('gulp-connect');
var glob         = require('gulp-sass-glob');
var sass         = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('src/stylesheets/**/*.scss', ['scss']);
});

gulp.task('sass', function(){
  return gulp.src('src/stylesheets/**/*.scss')
    .pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/stylesheets'))
});