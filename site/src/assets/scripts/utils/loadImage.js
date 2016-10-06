var Q = require('../libs/kew');

module.exports = function(url, imgEl) {

	var deferred = Q.defer();

	imgEl = imgEl || new Image();

	imgEl.onload = function(){

		deferred.resolve(imgEl);
	};

	imgEl.onerror = function(){

		deferred.reject(new Error('Error loading image'));
		imgEl = null;
	};


	imgEl.src = url;

	return deferred.promise;
};