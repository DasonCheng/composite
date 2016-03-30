var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');

var paths = {
    js: 'origin/js/*.js',
    sass: 'origin/sass/*.scss',
    img: 'origin/imgs/*',
    jade: 'views/*.jade'
};
gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        // .pipe(concat('all.js'))
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
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

// gulp.task('jade',function() {
//     gulp.src(paths.jade)
//         .pipe(jade({ pretty: true }))
//         .pipe(gulp.dest('src/html'));
// });

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.img, ['img']);
    // gulp.watch(paths.jade, ['jade']);
});


gulp.task('default', ['watch']);
