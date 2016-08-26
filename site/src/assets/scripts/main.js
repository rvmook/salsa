require('./libs/OBJLoader');

if(window.isReady) {
	init();

} else {
	window.init = init;
}

function init() {


	var threeHandler = require('./core/threeHandler');

	threeHandler.init();

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}