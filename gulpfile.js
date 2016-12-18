var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');    

gulp.task('styles', function() {
    return gulp.src('src/styles/main.css')
        .pipe(autoprefixer('last 2 version'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    const config = Object.create(webpackConfig);

    webpack(config, (err, stats) => {
        if (err) {
            throw new Error('scripts')
        }
        console.log('All good');
    })
});

gulp.task('clean', function() {
    return del(['dist/styles', 'dist/scripts']);
});


gulp.task("html", function() {
    return gulp.src(["src/index.html", "src/data.json"])
        .pipe(gulp.dest("dist/"));
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'html');
});

gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/index.html', ['html']);
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);

});