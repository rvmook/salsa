var threeHandler = require('./threeHandler'),
	socketHandler = require('./socketHandler'),
	Q = require('../libs/kew'),
	preloaderEl = document.querySelector('.preloader'),
	FAKE_TIME = 7;

function preload() {

	var deferred = Q.defer(),
		fakeProgress = {p:0},
		realProgress = {p:0},
		displayProgress = 0;

	TweenLite.to(fakeProgress, FAKE_TIME, {
		p: 1,
		onUpdate:updateDisplayProgress
	});

	threeHandler.preload(updateRealProgress);

	function updateRealProgress(newProgress) {

		TweenLite.to(realProgress, 0.3, {
			p: newProgress,
			onUpdate:updateDisplayProgress
		});

		updateDisplayProgress();
	}

	return deferred.promise;

	function updateDisplayProgress() {

		var newDisplayProgress = Math.min(realProgress.p, fakeProgress.p);

		if(displayProgress !== newDisplayProgress) {

			displayProgress = newDisplayProgress;

			preloaderEl.style.webkitTransform = 'translate3d(0,' + ((1-displayProgress)*100) + '%,0)';
			preloaderEl.style.transform = 'translate3d(0,' + ((1-displayProgress)*100) + '%,0)';

			if(displayProgress === 1) {

				preloaderEl.classList.remove('is-animating');
				preloaderEl.parentNode.removeChild(preloaderEl);
				deferred.resolve();
			}
		}
	}
}

exports.load = preload;