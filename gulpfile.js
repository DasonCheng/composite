var gulp = require('gulp');
var uglify = require('gulp-uglify'); //js压缩
var jade = require('gulp-jade'); //jade编译
var sass = require('gulp-sass'); //sass编译
var imagemin = require('gulp-imagemin'); //image压缩
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');

var paths = {
    js: 'src/js/*.js',
    sass: 'src/sass/*.scss',
    img: 'src/imgs/*',
    jade:'views/*.jade'
};
gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));
});

gulp.task('img', function() {
    return gulp.src(paths.img)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest('public/imgs'));
});

gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('jade',function() {
    gulp.src(paths.jade)
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.img, ['img']);
    gulp.watch(paths.jade, ['jade']);
});


gulp.task('default', ['watch']);
