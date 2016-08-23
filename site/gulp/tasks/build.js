var gulp = require('gulp'),
	runSequence = require('run-sequence');

module.exports = function(taskName) {

	if(global.isProd) {

		gulp.task(taskName, function(callback) {
			runSequence('clean',
				['copyAssets', 'copyScripts', 'styles', 'browserify', 'hbs'],
				'rev',
				callback);
		});

	} else {

		gulp.task(taskName, function(callback) {
			runSequence('clean',
				['copyAssets', 'copyScripts', 'styles', 'browserify', 'hbs'],
				callback);
		});
	}


};