require('./libs/OBJLoader');
var preloader = require('./core/preloader'),
	Q = require('./libs/kew'),
	socketHandler = require('./core/socketHandler');

var threeHandler = require('./core/threeHandler');

threeHandler.init();
removeObsoleteStyles();
Q.all([
	preloader.load(),
	setupSocket()
]).then(threeHandler.start)
	.fail(function(e){
		console.error(e);
	});


function setupSocket() {

	console.log('setupSocket');

	return socketHandler.init()
		.then(socketHandler.connectSalsa)
		.then(function(salsaId){
			console.log('connected as', salsaId);
		})
}



function removeObsoleteStyles() {

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}
