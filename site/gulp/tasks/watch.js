var config = require('../config'),
	browserSync = require('../util/browserSync'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, ['build'], function () {

		gulp.watch(config.browserify.watch, ['browserify', browserSync.reload]);
		gulp.watch(config.copyScripts.src, ['copyScripts', browserSync.reload]);
		gulp.watch(config.styles.src, ['styles', browserSync.reload]);
		gulp.watch(config.copyAssets.src, ['copyAssets', browserSync.reload]);
		gulp.watch(config.hbs.watch, ['hbs', browserSync.reload]);
		gulp.watch(config.eslint, ['eslint']);
	});
};