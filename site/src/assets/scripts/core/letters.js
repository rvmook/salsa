var Q = require('../libs/kew'),
	hideDeffered,
	loadImage = require('../utils/loadImage'),

	FADE = [
		{x:-75,y:-75},
		{'x': 1, 'y': 1},
		{'x': 319, 'y': 1},
		{'x': 637, 'y': 1},
		{'x': 955, 'y': 1},
		{'x': 1273, 'y': 1},
		{'x': 1591, 'y': 1},
		{'x': 1, 'y': 79},
		{'x': 319, 'y': 79},
		{'x': 637, 'y': 79},
		{'x': 955, 'y': 79},
		{'x': 1273, 'y': 79},
		{'x': 1591, 'y': 79},
		{'x': 1, 'y': 157},
		{'x': 319, 'y': 157}
	],
	LOOP = [
		{'x': 955, 'y': 157},
		{'x': 1273, 'y': 157},
		{'x': 1591, 'y': 157},
		{'x': 1, 'y': 235},
		{'x': 319, 'y': 235},
		{'x': 637, 'y': 235},
		{'x': 955, 'y': 235},
		{'x': 1273, 'y': 235},
		{'x': 1591, 'y': 235},
		{'x': 1, 'y': 313},
		{'x': 319, 'y': 313},
		{'x': 637, 'y': 313},
		{'x': 955, 'y': 313},
		{'x': 1273, 'y': 313},
		{'x': 1591, 'y': 313},
		{'x': 1, 'y': 391},
		{'x': 319, 'y': 391},
		{'x': 637, 'y': 391},
		{'x': 955, 'y': 391},
		{'x': 1273, 'y': 391},
		{'x': 1591, 'y': 391},
		{'x': 1, 'y': 469},
		{'x': 319, 'y': 469},
		{'x': 637, 'y': 469},
		{'x': 955, 'y': 469},
		{'x': 1273, 'y': 469},
		{'x': 1591, 'y': 469},
		{'x': 1, 'y': 547},
		{'x': 319, 'y': 547},
		{'x': 637, 'y': 547},
		{'x': 955, 'y': 547},
		{'x': 1273, 'y': 547},
		{'x': 1591, 'y': 547},
		{'x': 1, 'y': 625},
		{'x': 319, 'y': 625},
		{'x': 637, 'y': 625},
		{'x': 955, 'y': 625},
		{'x': 1273, 'y': 625},
		{'x': 1591, 'y': 625},
		{'x': 1, 'y': 703},
		{'x': 319, 'y': 703},
		{'x': 637, 'y': 703},
		{'x': 955, 'y': 703},
		{'x': 1273, 'y': 703},
		{'x': 1591, 'y': 703},
		{'x': 1, 'y': 781},
		{'x': 319, 'y': 781},
		{'x': 637, 'y': 781},
		{'x': 955, 'y': 781},
		{'x': 1273, 'y': 781},
		{'x': 1591, 'y': 781},
		{'x': 1, 'y': 859},
		{'x': 319, 'y': 859},
		{'x': 637, 'y': 859},
		{'x': 955, 'y': 859},
		{'x': 1273, 'y': 859},
		{'x': 1591, 'y': 859},
		{'x': 1, 'y': 937},
		{'x': 319, 'y': 937},
		{'x': 637, 'y': 937},
		{'x': 955, 'y': 937},
		{'x': 1273, 'y': 937},
		{'x': 1591, 'y': 937},
		{'x': 1, 'y': 1015},
		{'x': 319, 'y': 1015},
		{'x': 637, 'y': 1015},
		{'x': 955, 'y': 1015},
		{'x': 1273, 'y': 1015},
		{'x': 1591, 'y': 1015},
		{'x': 1, 'y': 1093},
		{'x': 319, 'y': 1093}
	];


var _playingArray = [{x:-75,y:-75}],
	STATE_FADE_IN = 0,
	STATE_LOOP = 1,
	STATE_FADE_OUT_REQUESTED = 2,
	STATE_FADE_OUT = 3,
	_state = STATE_FADE_IN,
	_requestedFrame,
	_imgEl = document.querySelector('.letters__bg'),
	_frame = 0;

exports.init = function() {

	return loadImage(_imgEl.getAttribute('data-src'), _imgEl)
		.then(start);
};

exports.hide = function() {

	hideDeffered = Q.defer();
	_state = STATE_FADE_OUT_REQUESTED;

	return hideDeffered.promise;
};

function start() {

	_frame = 0;
	_playingArray = FADE;

	return Q.delay(1000)
		.then(function(){

			startAnimating(24);
		});
}

function redraw() {

	var currFrame = _playingArray[_frame],
		x = -currFrame.x,
		y = -currFrame.y;

	_imgEl.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';

	if(_state !== STATE_FADE_OUT) {

		_frame++;

	} else {

		_frame--;

	}
	if(_frame < 0) {

		console.log('hierzo');
		Q.delay(1000).then(function(){
			console.log('whut?');
			hideDeffered.resolve();
		});
		cancelAnimationFrame(_requestedFrame);
		return;
	}


	if(_frame > _playingArray.length-1) {

		if(_state === STATE_FADE_OUT_REQUESTED) {

			_state = STATE_FADE_OUT;
			_playingArray = FADE;

			_frame = _playingArray.length - 1;
			return
		}


		if(_state === STATE_FADE_IN) {

			_state = STATE_LOOP;
			_playingArray = LOOP;
		}

		_frame = 0;
	}
}

var fpsInterval, startTime, now, then, elapsed;

// initialize the timer variables and start the animation

function startAnimating(fps) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
	animate();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

	// request another frame

	_requestedFrame = requestAnimationFrame(animate);

	// calc elapsed time since last loop

	now = Date.now();
	elapsed = now - then;

	// if enough time has elapsed, draw the next frame

	if (elapsed > fpsInterval) {

		// Get ready for next frame by setting then=now, but also adjust for your
		// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
		then = now - (elapsed % fpsInterval);

		// Put your drawing code here
		redraw();
	}
}