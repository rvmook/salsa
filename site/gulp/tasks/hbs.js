var config = require('../config'),
	handlebarsTask = require('../util/handlebarsTask'),
	gulp = require('gulp');

module.exports = function(taskName) {

	var tasks = [];

	tasks.push(createTask('index', config.hbs.basePath + '/index.hbs', config.hbs.dist));
	tasks.push(createTask('debug', config.hbs.basePath + '/debug.hbs', config.hbs.dist));

	gulp.task(taskName, tasks);


	function createTask(subName, src, dist) {

		var subTaskName = taskName + '--' + subName;

		gulp.task(subTaskName, function(){

			return handlebarsTask({
				src: src,
				dataRequire:config.hbs.dataRequire,
				data: {
					isProd: global.isProd
				},
				partials: config.hbs.partials,
				dist: dist,
				minifyHTML: config.hbs.minifyHTML
			})
		});

		return subTaskName;
	}
};