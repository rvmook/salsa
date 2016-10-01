require('./libs/OBJLoader');
var preloader = require('./core/preloader'),
	socketHandler = require('./core/socketHandler');


if(window.isReady) {
	init();

} else {
	window.init = init;
}

function init() {


	var threeHandler = require('./core/threeHandler');
	socketHandler.init();
	threeHandler.init();
	removeObsoleteStyles();

	preloader.load(function(){


		threeHandler.start();
	});


}

function removeObsoleteStyles() {

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}
