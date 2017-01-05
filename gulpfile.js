'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');

var paths = {
    site: {
        html: ['site/*.html'],
        vendor: ['bower_components/angular/angular.js'],
        app: ['app/**/*.module.ts', 'app/**/*.controller.ts'],
        css: ['bower_components/bootstrap/dist/css/bootstrap.css']
    },
    destination: 'dist/'
};

gulp.task('typescript', function () {
    return gulp.src(paths.site.app)
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('built/local'));
});

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
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(concat('js/app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('build-css', function () {
    return gulp.src(paths.site.css)
        .pipe(sourcemaps.init())
        .pipe(concat('css/app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('build', function () {
    runSequence('clean',
        ['copy', 'build-js-vendor', 'build-js-app', 'build-css'],
        'browser-sync');
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.site.html, ['copy']);
    gulp.watch(paths.site.app, ['build-js-app']);
});