var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

var scss_file = 'assets/sass/*.scss';

var css_dest = 'assets/css/';

var js_file = 'assets/js/*.js';

var js_dest = 'assets/js/';

var sass_dev_options = {
	outputStyle: 'expanded'
}

var sass_prod_options = {
	outputStyle: 'compressed'
}

gulp.task('sassdev', function() {

	return gulp.src(scss_file)
		.pipe(sass(sass_dev_options).on('error', sass.logError))
		.pipe(gulp.dest(css_dest))

});

gulp.task('sassprod', function() {

	return gulp.src(scss_file)
		.pipe(sass(sass_prod_options).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(css_dest))

});

gulp.task('minifyjs', function(){

	return gulp.src(js_file)
		.pipe(rename('script.min.js'))
		.pipe(uglify().on('error', uglify.GulpUglifyError))		
		.pipe(gulp.dest(js_dest))

});

gulp.task('w', function() {

	gulp.watch(scss_file, ['sassdev', 'sassprod']);
	gulp.watch(js_file, ['minifyjs']);

});

gulp.task('default', ['sassdev', 'sassprod', 'minifyjs', 'w']);