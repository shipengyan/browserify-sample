/**
 * Created by shi.pengyan on 2015-10-08.
 */
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');


var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var streamify = require('gulp-streamify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var lint = require('gulp-eslint');

var path = {
  HTML: './src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js',
  JS_SRC: './src/**/*.js'
};


gulp.task('clean', function () {
  del(path.DEST);
});

gulp.task('html', function () {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  browserify(path.ENTRY_POINT)
    .transform(babelify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('livereload', function () {
  gulp.src(path.JS_SRC)
    .pipe(watch(path.JS_SRC))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  return gulp.src(path.JS_SRC)
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function () {
  gulp.watch(path.HTML, ['html']);

  //会刷新所有文件
  //gulp.watch(path.JS_SRC, ['js', 'lint']);
});

gulp.task('webserver', function () {
  connect.server({
    root: './dist',
    port: 3000,
    livereload: true
  });
});


//gulp.task('build', function () {
//  browserify({
//    entries: [path.ENTRY_POINT],
//    transform: [babelify]
//  })
//    .bundle()
//    .pipe(source(path.MINIFIED_OUT))
//    .pipe(streamify(uglify(path.MINIFIED_OUT)))
//    .pipe(gulp.dest(path.DEST_BUILD));
//});

//gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['clean', 'html', 'js', 'webserver', 'watch', 'livereload']);