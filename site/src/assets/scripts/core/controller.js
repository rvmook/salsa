var Signal = require('../libs/signals'),
	_pointerEl,
	_rotated,
	_turned,
	rotationUpdated = new Signal(),
	_currentRotation;

function init(rotated, turned) {

	_pointerEl = document.querySelector('.pointer');
	_rotated = rotated;
	_turned = turned;
	// document.addEventListener('mousemove', onDocumentMouseMove, false);

	console.log('init', 0);
	if (window.DeviceOrientationEvent) {
	console.log('init', 1);
		window.addEventListener('deviceorientation', onDeviceOrientation);
	} else {
		console.log('init', 2);
	}
}

function onDeviceOrientation(e) {

	var clampGamma = Math.min(90, Math.max(-90, e.gamma)) / 90,
		deg = clampGamma * 30;


	_pointerEl.style.transform = 'rotate(' + deg + 'deg)';

	_turned.dispatch(clampGamma);
}


function onDocumentMouseMove( event ) {

	var newRotationDeg = roundTo(360 * (event.clientX / window.innerWidth), 1);

	if(_currentRotation !== newRotationDeg) {

		_currentRotation = newRotationDeg;

		rotationUpdated.dispatch(0, _currentRotation, 0);
		_rotated.dispatch(_currentRotation);
	}
}

function roundTo(value, round) {

	return Math.round(value / round) * round;
}

exports.init = init;
exports.rotationUpdated = rotationUpdated;