// Include gulp
var gulp = require('gulp');

// Include Our Plugins
const child = require('child_process');
const gutil = require('gulp-util');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

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

gulp.task('htmlmin', function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_deploy'))
});

gulp.task('cssmin', function () {
    gulp.src('_site/**/*.css')
        .pipe(cssmin())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_deploy'));
});

gulp.task('imagemin', () => {
  return gulp.src('_site/**/*.jpeg')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('_deploy'));
});

// Default Task
gulp.task('default', ['htmlmin', 'cssmin', 'imagemin']);
