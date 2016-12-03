		var gulp = require('gulp'),
		    livereload = require('gulp-livereload'),
		    webserver = require('gulp-webserver');

		gulp.task('webserver', function() {
		    gulp.src('app')
		        .pipe(webserver({
		            livereload: true,
		            port: 8089,
		            open: '/bookings',
		            fallback: 'index.html'
		        }));
		});

		

		gulp.task('watch', function() {
		    gulp.watch(['./app/*.html,./app/js/*.js'], ['livereload']);
		});
		
		gulp.task('livereload', function() {
		    livereload.listen();
		    livereload({
		    	start : true
		    });

		       
		});
		gulp.task('default', ['webserver', 'watch']);