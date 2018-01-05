'use strict';

var gulp = require('gulp');
var template = require('gulp-template-html');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();

var DIR = {
    SRC: 'src',
    DIST: 'dist'
};
var SRC = {
    JS: DIR.SRC + '/js/*.js',
    PLUGINS: DIR.SRC + '/js/plugins/*.js',
    CSS: DIR.SRC + '/css/*.css',
    IMG: DIR.SRC + '/img/**',
    SCSS: DIR.SRC + '/scss/*.scss',
    HTML: DIR.SRC + '/*.html',
    PAGES: DIR.SRC + '/pages/*.html'
};
var DIST = {
    JS: DIR.DIST + '/js',
    PLUGINS: DIR.DIST + '/js/plugins',
    CSS: DIR.DIST + '/css',
    IMG: DIR.DIST + '/img',
    PAGES: DIR.DIST + '/pages',
    HTML: DIR.DIST + '/'
};

gulp.task('server', ['sass', 'html'], function() {
   browserSync.init({
       server: {
           baseDir: './dist',
           index: 'index.html'
       },
       port: 1013

   });
   gulp.watch(SRC.SCSS, ['sass']);
   gulp.watch(SRC.HTML, ['html']);
});

gulp.task('sass', function(){
    return gulp.src(SRC.SCSS)
        .pipe(sass({
            outputStyle: 'compressed' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest(DIST.CSS))
        .pipe(browserSync.stream());
});

gulp.task('html', function(){
    return gulp.src(SRC.HTML)
        .pipe(template('src/templates/temp0.html'))
        .pipe(gulp.dest(DIST.HTML))
        .pipe(browserSync.stream());
});

gulp.task('jquery', function(){
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(DIST.JS));
});
gulp.task('bootstrapJs', function(){
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest(DIST.JS));
});

gulp.task('default', ['server', 'jquery', 'bootstrapJs'], function(){
    console.log('gulp run~~!!');
});