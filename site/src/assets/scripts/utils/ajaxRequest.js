var Q = require('../libs/kew'),
	STATUS_OK= 200,
	READY_STATE_DONE = 4;

module.exports = function(url, settings) {

	var deferred = Q.defer();

	if(!settings) {

		settings = {};
	}

	var request = new XMLHttpRequest(),
		method = settings.method || 'GET';

	if(settings.onProgress) {

		request.onprogress = function(xhr){

			var progress = xhr.loaded / xhr.total;

			settings.onProgress(progress);
		}
	}
	// needs to be open before responseType is set
	request.open(method, url, true);

	if(settings.responseType) {

		request.responseType = settings.responseType;
	}

	if(settings.contentType) {

		request.setRequestHeader('Content-type', settings.contentType);
	}

	request.onreadystatechange = function() {

		var response;

		if(request.readyState === READY_STATE_DONE) {

			if(request.status === STATUS_OK) {

				response = request.response;

				deferred.resolve(response);

			} else {
				deferred.reject(request);
			}
		}
	};

	/*if(settings.params) {

		request.setRequestHeader('Content-length', settings.params.length);
	}*/

	request.send(JSON.stringify(settings.params));

	return deferred;
};
