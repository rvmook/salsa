var gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, ['build', 'browserSync', 'watch', 'eslint']);
};