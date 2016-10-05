var socketHandler = require('./core/socketHandler'),
	doc = document;

removeObsoleteStyles();
function removeObsoleteStyles() {

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}


socketHandler.init()
	.then(socketHandler.connectCanvas)
	.then(function(salsas){

		setupControls(doc.querySelector('.js-debugControls'));
		setupSalsas(doc.querySelector('.js-salsas'), salsas);
	})
	.fail(function(e){
		console.error(e);
	});


function setupSalsas(salsasEl, salsas) {

	var TEMPLATE = salsasEl.querySelector('.js-salsas__template').innerHTML,
		countEl = doc.querySelector('.js-salsas__count');

	socketHandler.reconnected.add(
		function(){

			socketHandler.connectCanvas()
				.then(onSalsasUpdated);
		}
	);

	socketHandler.salsasUpdated.add(onSalsasUpdated);

	onSalsasUpdated(salsas);

	function onSalsasUpdated(salsas) {

		var count = 0,
			key;

		salsasEl.innerHTML = '';

		for(key in salsas) {

			if(salsas.hasOwnProperty(key)) {

				count++;
				addSalsa(salsas[key])
			}
		}

		countEl.innerHTML = count;
	}

	function addSalsa(salsa) {

		var div = doc.createElement('div');
		div.innerHTML = TEMPLATE;
		div.className = 'debug__list__item';
		salsasEl.appendChild(div);

		var idEl = div.querySelector('.js-salsas__id'),
			rotationEl = div.querySelector('.js-salsas__rotation'),
			rotationController = div.querySelector('.js-salsas__rotation-controller'),
			disconnectEl = div.querySelector('.js-salsas__disconnect');

		idEl.innerHTML = salsa.id;
		rotationEl.innerHTML = salsa.angle + '°';
		rotationController.value = clampAngle(salsa.angle);

		disconnectEl.addEventListener('click', onDisconnectClick);

		rotationController.addEventListener('change', onRotationChange);

		function onDisconnectClick() {

			socketHandler.emit('disconnectSalsa', [salsa.id]);
		}

		function onRotationChange() {

			socketHandler.emit('rotateSalsa', [salsa.id, rotationController.value]);
		}
	}
}

function clampAngle(angle) {
	if(angle < 0) {

		return 360 + (angle % 360);

	} else {

		return angle % 360;
	}
}

function setupControls(controlsEl) {

	var addBtn = controlsEl.querySelector('.js-debugControls__add');

	addBtn.addEventListener('click', onAddClick);



	function onAddClick(e) {

		e.preventDefault();

		socketHandler.connectSalsa();
	}
}