var fs = require('fs'),
	path = require('path'),
	config = require('../config'),
	handlebarsTask = require('../util/handlebarsTask'),
	gulp = require('gulp');

module.exports = function(taskName) {


	var routeTasks = createHbsTasks(taskName, config.hbs.basePath + config.hbs.routesDirectory, ''),
		pageTasks = createHbsTasks(taskName, config.hbs.basePath + config.hbs.pagesDirectory, 'pages/');


	gulp.task(taskName, routeTasks.concat(pageTasks));
};

function createHbsTasks(baseTaskName, filePath, destDirectory) {


	var directories = getDirectories(filePath),
		directoryTasks = [],
		localeAndVersionTasks = [],
		directory,
		taskName,
		i;

	for(i = 0; i < directories.length; i++) {

		directory = directories[i];
		taskName = baseTaskName + '--' + directory;
		directoryTasks.push(taskName);
		localeAndVersionTasks = createPageTasks(taskName, filePath, directory, destDirectory);

		gulp.task(taskName, localeAndVersionTasks);
	}

	return directoryTasks;
}

function createPageTasks(pageTaskName, basePath, directory, destDirectory) {

	var individualPageTasks = [],
		filePath = path.join(basePath, directory),
		requiredData = getRequiredData(filePath),
		i;

	for(i = 0; i < requiredData.length; i++) {

		baseTemplateTask(requiredData[i]);
	}

	return individualPageTasks;


	function baseTemplateTask(file) {

		var partials,
			uniquePartialPath = path.join(filePath,'partials'),
			locale = path.basename(file, path.extname(file)).replace('data-', '');

		function task() {

			// Check if we have unique partials for this page
			try {

				fs.accessSync(uniquePartialPath, fs.F_OK);
				partials = config.hbs.partials.concat(uniquePartialPath);

			} catch(e) {

				partials = config.hbs.partials;
			}

			var dist = composeDist(directory, destDirectory, locale),
				localePath;

			if(locale === 'us-en') {

				localePath = '/';

			} else {

				localePath = '/' + locale + '/'
			}

			return handlebarsTask({
				src: filePath + '/index.hbs',
				dataRequire:file,
				data: {
					isProd: global.isProd,
					localePath: localePath
				},
				partials: partials,
				dist: dist,
				minifyHTML: config.hbs.minifyHTML
			});
		}

		var name = pageTaskName + '--' + locale;
		individualPageTasks.push(name);

		gulp.task(name, function(){return task()});
	}

	function getRequiredData(filePath) {

		var data = [],
			requiredPath,
			dataLocale,
			i;

		for(i = 0; i < config.locales.length; i++) {

			dataLocale = config.locales[i];
			requiredPath = path.join(filePath, 'data-' + dataLocale + '.json');

			if(fs.existsSync('./' + requiredPath)) {

				data.push('../../' + requiredPath);

			} else {

				console.log('Missing `' + dataLocale + '.json` in `./' + filePath + '/`');
			}
		}

		return data;
	}
}

function composeDist(directory, destDirectory, locale) {

	var dist = config.hbs.dist;

	if(locale !== 'us-en') {

		dist += locale + '/';
	}

	if(directory !== 'home') {

		dist += destDirectory + directory;
	}

	return dist;
}

function getDirectories(srcPath) {

	return fs.readdirSync(srcPath).filter(function(file) {

		return fs.statSync(path.join(srcPath, file)).isDirectory();
	});
}