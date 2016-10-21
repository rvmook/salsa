var Signal = require('../libs/signals'),
	_pointerEl,
	_wrapperEl,
	_rotated,
	_turned,
	rotationUpdated = new Signal(),
	_tween = {x:0,y:0},
	_currentRotationX = 0,
	_currentRotationY = 0;

function init(rotated, turned) {

	_pointerEl = document.querySelector('.pointer');
	_wrapperEl = document.querySelector('.wrapper');
	_rotated = rotated;
	_turned = turned;

	var mc = new Hammer(_wrapperEl);


	var storedDegX,
		storedDegY;

	mc.on('panstart', function() {

		storedDegX = _currentRotationX;
		storedDegY = _currentRotationY;
	});

	// listen to events...
	mc.on('panmove', function(ev) {

		tweenIt(0.5, ev.deltaX, ev.deltaY);
	});

	function tweenIt(time, deltaX, deltaY) {

		TweenLite.to(_tween, time, {
			ease:Cubic.easeOut,
			x:storedDegX + deltaX,
			// y:storedDegY + deltaY,
			onUpdate:function(){
				_currentRotationX = _tween.x;
				_currentRotationY = _tween.y;
				_rotated.dispatch(roundTo(_currentRotationX, 0.01), roundTo(_currentRotationY, 0.01));
				rotationUpdated.dispatch(_currentRotationY, _currentRotationX, 0);
			}
		});
	}

	mc.on('panend', function(ev) {

		tweenIt(0.8, ev.deltaX, ev.deltaY);
	});


	if (window.DeviceOrientationEvent) {

		window.addEventListener('deviceorientation', onDeviceOrientation);
	}
}

function onDeviceOrientation(e) {

	var clampGamma = Math.min(90, Math.max(-90, e.gamma)) / 90,
		deg = clampGamma * 30;


	_pointerEl.style.transform = 'rotate(' + deg + 'deg)';

	_turned.dispatch(clampGamma);
}

function roundTo(value, round) {

	return Math.round(value / round) * round;
}

exports.init = init;
exports.rotationUpdated = rotationUpdated;