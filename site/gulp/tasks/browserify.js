var config = require('../config'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	handleErrors = require('../util/handleErrors');


module.exports = function(taskName) {

	var browserifyTasks = [],
		entry,
		subTaskName,
		i;

	for(i = 0; i < config.browserify.bundles.length; i++) {

		entry = config.browserify.bundles[i];
		subTaskName = taskName + '--' + entry;

		gulp.task(subTaskName, browserifyTask(entry));

		browserifyTasks.push(subTaskName);
	}

	gulp.task(taskName, browserifyTasks);
};

function browserifyTask(entry) {

	return function() {

		return browserify({
				entries: config.browserify.entryPath + entry,
				debug: !global.isProd
			})
			.bundle()
			.on('error', handleErrors)
			.pipe(source(entry))
			.pipe(buffer())
			.pipe(gulpif(global.isProd,uglify()))
			.pipe(gulp.dest(config.browserify.dest));
	};
}