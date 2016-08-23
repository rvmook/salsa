var gulp = require('gulp'),
	browserSync = require('../util/browserSync');

module.exports = function(taskName) {

	gulp.task(taskName, ['build'] ,function() {

		browserSync.init({
			startPath: '/',
			server: {
				baseDir: './public'
			},
			ghostMode: {
				clicks: false,
				forms: false,
				scroll: false
			}
		});
	});
};