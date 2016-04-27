// Include gulp
var gulp = require('gulp');

// Include Our Plugins
const child = require('child_process');
const gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build']);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('htmlmin', ['jekyll'], function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_deploy'))
});

gulp.task('cssmin', ['jekyll'], function () {
    gulp.src('_site/**/*.css')
        .pipe(cssmin())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_deploy'));
});

// Default Task
gulp.task('default', ['jekyll', 'htmlmin', 'cssmin']);
