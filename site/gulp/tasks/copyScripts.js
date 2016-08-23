var config = require('../config'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function() {

		return gulp.src(config.copyScripts.src)
			.pipe(gulp.dest(config.copyScripts.dest));
	});
};