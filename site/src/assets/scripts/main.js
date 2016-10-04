require('./libs/OBJLoader');
var preloader = require('./core/preloader'),
	Q = require('./libs/kew'),
	Signal = require('./libs/signals'),
	rotated = new Signal(),
	socketHandler = require('./core/socketHandler');

var threeHandler = require('./core/threeHandler'),
	_salsaId;

threeHandler.init(rotated);
removeObsoleteStyles();
Q.all([
	preloader.load(),
	setupSocket()
]).then(threeHandler.start)
	.fail(function(e){
		console.error(e);
	});


rotated.add(onRotated);

function setupSocket() {

	return socketHandler.init()
		.then(connectAsSalsa);
}

function connectAsSalsa() {

	return socketHandler.connectSalsa()
		.then(function(salsaId){
			_salsaId = salsaId;

			socketHandler.reconnected.addOnce(connectAsSalsa);
		})
}


function onRotated(newRotation) {

	if(_salsaId) {

		socketHandler.emit('rotateSalsa', [_salsaId, newRotation])
	}
}


function removeObsoleteStyles() {

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}
