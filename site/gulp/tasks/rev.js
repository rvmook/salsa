var RevAll = require('gulp-rev-all'),
	gulp = require('gulp'),
	config = require('../config'),
	revdel = require('gulp-rev-delete-original');

module.exports = function(taskName) {

	gulp.task(taskName, function(){

		var revAll = new RevAll(
				config.rev.settings
			);

		gulp.src(config.rev.src)
			.pipe(revAll.revision())
			.pipe(revdel())
			.pipe(gulp.dest(config.rev.dest));
	});
};