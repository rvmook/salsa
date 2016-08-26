var config = require('../config'),
	handlebarsTask = require('../util/handlebarsTask'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function(){

		return handlebarsTask({
			src: config.hbs.basePath + '/index.hbs',
			dataRequire:config.hbs.dataRequire,
			data: {
				isProd: global.isProd
			},
			partials: config.hbs.partials,
			dist: config.hbs.dist,
			minifyHTML: config.hbs.minifyHTML
		})
	});
};