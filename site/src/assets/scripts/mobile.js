var sharedInit = require('./core/sharedInit');

if(window.isReady) {
	init();

} else {
	window.init = init;
}

function init() {

	sharedInit();
}