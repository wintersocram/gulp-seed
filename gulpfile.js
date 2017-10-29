var gulp = require('gulp');

/* gUtil
 * npm plugin: gulp-util
 * create console Log
 */
var gutil = require('gulp-util');

/* Sass
 * npm plugin: gulp-sass
 * Convert scss to css.
 * Check http://sass-lang.com/documentation/file.SASS_REFERENCE.html
 */
var sass = require('gulp-sass');

/* Uglify
 * npm plugin: gulp-uglify
 * Minify JavaScript
 */
var uglify = require('gulp-uglify');

/* Concat
 * npm plugin: gulp-concat
 * Join many files into a single one
 */
var concat = require('gulp-concat');

/* Connect
 * npm plugin: gulp-connect
 * Gulp plugin to run a webserver (with LiveReload)
 * gulp-connect is sponsored by JetBrains!
 */
var connect = require('gulp-connect');


var htmlSources = ['./src/*.html'],
	jsSources = ['./src/scripts/*.js'],
    sassSources = ['./src/styles/*.scss'],
    outputDir = 'dist';

gulp
	.task('log', function() {
		gutil.log('==> My Log Task <==');
	})
	.task('copy-html', function() {
	  gulp.src(htmlSources)
	  .pipe(gulp.dest(outputDir))
	  .pipe(connect.reload())
	})
	.task('js', function (cb) {
		gulp.src(jsSources)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
	})
	.task('sass', function() {
		gulp.src(sassSources)
		.pipe(sass({style: 'expanded'}))
			.on('error', gutil.log)
		.pipe(concat('style.css'))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
	})
	.task('html', function() {
	  gulp.src(htmlSources)
	  .pipe(connect.reload())
	})
	.task('connect', function() {
		connect.server({
			root: './' + outputDir,
			livereload: true
		})
	})
	.task('watch', function() {
		gulp.watch(htmlSources, ['copy-html']);
		gulp.watch(jsSources, ['js']);
		gulp.watch(sassSources, ['sass']);
	})
	.task('default', ['html', 'js', 'sass', 'connect', 'watch']);