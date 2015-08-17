var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('templates', function() {
	gulp.src('app/jade.local/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app/'))
});

gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});


gulp.task('default', ['server', 'watch'], function(){
	gulp.watch('app/jade.local/*.jade', ['templates']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
});