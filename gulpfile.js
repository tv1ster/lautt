'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
    site: {
        html: ['site/*.html'],
        vendor: ['bower_components/angular/angular.js'],
        app: ['app/**/*.js']
    },
    destination: 'dist/'
};

gulp.task('clean', function() {
    return del(paths.destination);
});

gulp.task('copy', function() {
    return gulp.src(paths.site.html)
        .pipe(gulp.dest(paths.destination));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: paths.destination
        }
    });
});

gulp.task('build-js-vendor', function() {
    return gulp.src(paths.site.vendor)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('js/vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('build-js-app', function() {
    return gulp.src(paths.site.app)
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('js/app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('build', ['clean', 'copy', 'build-js-vendor', 'build-js-app', 'browser-sync']);

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.site.html, ['copy']);
    gulp.watch(paths.site.app, ['build-js-app']);
});