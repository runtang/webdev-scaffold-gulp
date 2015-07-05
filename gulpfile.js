var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var watchPath = require('gulp-watch-path');
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');
var fs = require('fs');

// 参数指定dev或build环境，此处可优化
var config = {
	dev: true
};

var isDev = function() {
	return config.dev;
}

gulp.task('isDev', function() {
	config.dev = true;
});

gulp.task('isBuild', function() {
	config.dev = false;
});

gulp.task('clean-public', function () {
	return gulp.src('public', {read: false})
    	.pipe(clean());  	
})

gulp.task('clean-dist', function () {
	return gulp.src('dist', {read: false})
    	.pipe(clean());  	
})

gulp.task('clean-usemintmp', function () {
	return gulp.src('usemintmp', {read: false})
    	.pipe(clean());  	
})

gulp.task('clean-views', function () {
	return gulp.src('views/dist', {read: false})
    	.pipe(clean());  	
})

gulp.task('clean', ['clean-public', 'clean-dist', 'clean-usemintmp', 'clean-views']);

gulp.task('js', ['clean'], function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulpif(!isDev(), uglify()))
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', ['clean'], function() {
	return gulp.src('src/css/**/*.css')
        .pipe(prefixer())	
		.pipe(gulpif(!isDev(), minifyCSS()))
		.pipe(gulp.dest('public/css'));
});

gulp.task('less', ['clean'], function () {
	return gulp.src('src/css/**/*.less')
        .pipe(less())
        .pipe(prefixer())
        .pipe(gulpif(!isDev(), minifyCSS()))
		.pipe(gulp.dest('public/css'));
});

gulp.task('img', ['clean'], function () {
	var buildPath = isDev()?'public/img':'dist/img';
    return gulp.src('src/img/**/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(buildPath));
});

gulp.task('usemin', ['clean', 'js', 'css', 'less'], function() {
	return gulp.src('views/src/**/*.hjs')
		.pipe(usemin({
			path: './'
		}))
		.pipe(gulp.dest('./usemintmp'));
});

gulp.task('copy', ['usemin'], function() {
	gulp.src(['usemintmp/**/*.js', 'usemintmp/**/*.css'])
		.pipe(gulp.dest('dist'));
	gulp.src('usemintmp/**/*.hjs')
		.pipe(gulp.dest('views/dist'));
});

gulp.task('dev', ['isDev', 'clean', 'js', 'css', 'less', 'img'], function() {
	gulp.watch('src/**/*.*', ['clean', 'js', 'css', 'less', 'img']);		
	// gulp.watch('src/js/**/*.js', ['js']);
	// gulp.watch('src/css/**/*.css', ['css']);
	// gulp.watch('src/css/**/*.less', ['less']);
	// gulp.watch('src/img/**/*.*', ['img']);
});

gulp.task('build', ['clean', 'isBuild', 'js', 'css', 'less', 'img', 'usemin', 'copy']);
