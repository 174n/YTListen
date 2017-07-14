const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src('app/js/**/_*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./app/js/'))
      .pipe(minify({
        ext:{
            min:'_min.js'
        },
        ignoreFiles: ['_*.js', '*_min.js'],
        compress: {
        }
      }))
      .pipe(gulp.dest('./app/js/'))
      .pipe(browserSync.stream());;
});

gulp.task('html', function() {
    gulp.src(['app/html/**/*.html', '!app/html/**/_*.html'])
      .pipe(rigger())
      .pipe(gulp.dest('./app/'));
});


gulp.task('serve', ['sass', 'js', 'html'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js", ['js']);
    gulp.watch("app/html/**/*.html", ['html']).on('change', browserSync.reload);
});


gulp.task('default', ['serve']);