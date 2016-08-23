var handleErrors = require('../util/handleErrors'),
	gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	handlebars = require('gulp-compile-handlebars'),
	minifyHTML = require('gulp-htmlmin'),
	rename = require('gulp-rename');

module.exports = function(handlebarsConfig) {

	var templateData = createTemplateData(),
		options = {
			batch: handlebarsConfig.partials
		};

	return gulp.src(handlebarsConfig.src)
		.pipe(handlebars(templateData, options))
		.on('error', handleErrors)
		.pipe(rename(function(path) {

			path.extname = '.html';
		}))
		.pipe(gulpIf(global.isProd, minifyHTML(handlebarsConfig.minifyHTML)))
		.pipe(gulp.dest(handlebarsConfig.dist));

	function createTemplateData() {

		var key,
			templateData = {};

		if(handlebarsConfig.dataRequire) {

			templateData = getRequiredData();
		}

		if(handlebarsConfig.data) {

			for(key in handlebarsConfig.data) {

				if(handlebarsConfig.data.hasOwnProperty(key)) {

					templateData[key] = handlebarsConfig.data[key];
				}
			}
		}

		console.log('templateData', templateData);

		return templateData;

		function getRequiredData() {

			var data;

			try {

				// deleting the require cache to make sure we get the latest json if it's updated
				delete require.cache[require.resolve(handlebarsConfig.dataRequire)];

				data = require(handlebarsConfig.dataRequire);

			} catch(e) {

				data = {};
				console.log(e);
			}

			return data;
		}
	}
};