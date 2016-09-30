var threeHandler = require('./threeHandler'),
	preloaderEl = document.querySelector('.preloader'),
	FAKE_TIME = 3;

function preload(callback) {

	var fakeProgress = {p:0},
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

	function updateDisplayProgress() {

		var newDisplayProgress = Math.min(realProgress.p, fakeProgress.p);

		if(displayProgress !== newDisplayProgress) {

			displayProgress = newDisplayProgress;

			preloaderEl.style.transform = 'scaleY(' + displayProgress + ')';

			if(displayProgress === 1) {

				preloaderEl.parentNode.removeChild(preloaderEl);
				callback();
			}
		}
	}
}

exports.load = preload;