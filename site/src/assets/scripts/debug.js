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

		console.log('salsas', salsas);

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

	function onSalsasUpdated(rawSalsas) {


		var salsas = parseSalsas(rawSalsas),
			count = 0,
			i;

		salsasEl.innerHTML = '';

		for(i = 0; i < salsas.length; i++) {

			count++;
			addSalsa(salsas[i]);
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

		rotationEl.innerHTML += 'suit: ' + salsa.suit + '<br>';
		rotationEl.innerHTML += 'skin: ' + salsa.skin + '<br>';
		rotationEl.innerHTML += 'goggle: ' + salsa.goggle + '<br>';

		if(salsa.swimming) {

			rotationEl.innerHTML += 'swimming: ' + salsa.swimming + '<br>';
			rotationEl.innerHTML += 'direction: ' + salsa.direction + '<br>';
			rotationEl.innerHTML += 'rotation: ' + salsa.rotation;
			rotationController.value = clampAngle(salsa.rotation);
		}


		disconnectEl.addEventListener('click', onDisconnectClick);

		rotationController.addEventListener('change', onRotationChange);

		function onDisconnectClick() {

			socketHandler.emit('disconnectSalsa', [salsa.id]);
		}

		function onRotationChange() {

			console.log('onRotationChange() - rotateSalsa', [salsa.id, rotationController.value]);
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

function parseSalsas(rawSalsas) {

	var salsas = rawSalsas.split(';'),
		parsed = [],
		salsa,
		salsaParts,
		id,
		suit,
		skin,
		goggle,

		swimming,
		rotation,
		direction,
		i;

	for(i = 0; i < salsas.length; i++) {

		salsa = salsas[i];
		if(salsa.length === 0) {

			continue;
		}
		salsaParts = salsa.split(',');

		id = salsaParts[0];
		suit = salsaParts[1][0];
		skin = salsaParts[1][1];
		goggle = salsaParts[1][2];
		rotation = salsaParts[2];
		direction = salsaParts[3];
		swimming = (rotation !== undefined && direction !== undefined);

		parsed.push({
			id:Number(id),
			suit:Number(suit),
			skin:Number(skin),
			goggle:Number(goggle),
			rotation:Number(rotation),
			direction:Number(direction),
			swimming:swimming
		})
	}

	return parsed;
}