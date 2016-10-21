require('./libs/OBJLoader');
var preloader = require('./core/preloader'),
	Q = require('./libs/kew'),
	Signal = require('./libs/signals'),
	rotated = new Signal(),
	globals = require('./core/globals'),
	turned = new Signal(),
	letters = require('./core/letters'),
	socketHandler = require('./core/socketHandler');

var threeHandler = require('./core/threeHandler'),
	controller = require('./core/controller'),
	_salsaId;

controller.init(rotated, turned);
threeHandler.init();
removeObsoleteStyles();

setupSocket()
	.then(function(){

		return Q.all([
			letters.init(),
			preloader.load(),
			threeHandler.preload()
		])
	})
	.then(letters.hide)
	.then(threeHandler.start)
	.then(preloader.destroy)
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
		.then(function(salsa){

			_salsaId = salsa.index;

			globals.salsa = salsa;

			socketHandler.reconnected.addOnce(connectAsSalsa);
		})
}


function onTurned(newTurn) {

	if(_salsaId) {

		socketHandler.emit('turnSalsa', [_salsaId, newTurn])
	}
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