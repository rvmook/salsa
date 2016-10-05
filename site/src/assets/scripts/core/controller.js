var Signal = require('../libs/signals'),
	_pointerEl,
	_wrapperEl,
	_rotated,
	_turned,
	rotationUpdated = new Signal(),
	_tween = {x:0},
	_currentRotation = 0;

function init(rotated, turned) {

	_pointerEl = document.querySelector('.pointer');
	_wrapperEl = document.querySelector('.wrapper');
	_rotated = rotated;
	_turned = turned;

	var mc = new Hammer(_wrapperEl);


	var storedDeg;

	mc.on('panstart', function() {

		storedDeg = _currentRotation;
	});

	// listen to events...
	mc.on('panmove', function(ev) {

		tweenIt(0.5, ev.deltaX);
	});

	function tweenIt(time, delta) {

		TweenLite.to(_tween, time, {
			ease:Cubic.easeOut,
			x:storedDeg + delta,
			onUpdate:function(){
				_currentRotation = _tween.x;
				_rotated.dispatch(roundTo(_currentRotation, 0.01));
				rotationUpdated.dispatch(0, _currentRotation, 0);
			}
		});
	}

	mc.on('panend', function(ev) {

		tweenIt(0.8, ev.deltaX);
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