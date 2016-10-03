var socket = io(),
	Q = require('../libs/kew'),
	TIMEOUT_DURATION = 5000;

exports.init = function() {

	var deferred = Q.defer();

	// Socket IO
	addConnectListeners();

	return deferred.promise;

	function addConnectListeners() {

		socket.on('connect', onConnect);
		socket.on('connect_error', onConnectError);
		socket.on('connect_timeout', onConnectTimeout);
	}

	function removeConnectListeners() {

		socket.off('connect', onConnect);
		socket.off('connect_error', onConnectError);
		socket.off('connect_timeout', onConnectTimeout);
	}

	/**
	 * Fired upon a connection error
	 * @param {Object} error
	 */
	function onConnectError(error) {

		removeConnectListeners();
		deferred.reject(new Error('onConnectError - error - ' + JSON.stringify(error)));
	}

	/**
	 * Fired upon a connection timeout
	 */
	function onConnectTimeout() {

		removeConnectListeners();
		deferred.reject(new Error('onConnectTimeout'));
	}

	/**
	 * Fired upon a successful connection
	 */
	function onConnect() {

		removeConnectListeners();

		deferred.resolve();

		socket.on('reconnect', onReconnect);
		socket.on('reconnect_attempt', onReconnectAttempt);
		socket.on('reconnecting', onReconnecting);
		socket.on('reconnect_error', onReconnectError);
		socket.on('reconnect_failed', onReconnectFailed);
	}
};

exports.connectSalsa = function() {

	var deferred = Q.defer(),
		timeOutConnectionId = setTimeout(connectSalsaError, TIMEOUT_DURATION);

	socket.on('salsaConnectedAs', onSalsaConnectedAs);
	socket.emit('connectSalsa');

	return deferred.promise;

	function connectSalsaError() {

		cleanup();

		deferred.reject(new Error('connectSalsaError'));
	}

	/**
	 * Fired upon successful Salsa connection
	 * @param {String} id
	 */
	function onSalsaConnectedAs(id) {

		cleanup();
		updateStatus('onSalsaConnectedAs - ' + id);
		deferred.resolve(id);
	}

	function cleanup() {

		clearTimeout(timeOutConnectionId);
		socket.off('salsaConnectedAs', onSalsaConnectedAs);
	}
};

exports.connectCanvas = function() {

	var deferred = Q.defer(),
		timeOutConnectionId = setTimeout(connectError, TIMEOUT_DURATION);

	socket.on('canvasConnected', onCanvasConnected);
	socket.emit('connectCanvas');

	return deferred.promise;

	function connectError() {

		cleanup();

		deferred.reject(new Error('connectCanvasError'));
	}

	/**
	 * Fired upon successful Salsa connection
	 * @param {Array} salsas
	 */
	function onCanvasConnected(salsas) {

		cleanup();
		updateStatus('onCanvasConnected - ' + salsas);
		deferred.resolve(salsas);
	}

	function cleanup() {

		clearTimeout(timeOutConnectionId);
		socket.off('canvasConnected', onCanvasConnected);
	}
};

/**
 * Fired upon a successful reconnection
 * @param {Number} reconnectionAttemptNumber
 */
function onReconnect(reconnectionAttemptNumber) {
	updateStatus('onReconnect - reconnectionAttemptNumber - ' + reconnectionAttemptNumber);
}

/**
 * Fired upon an attempt to reconnect
 */
function onReconnectAttempt() {
	updateStatus('onReconnectAttempt');
}

/**
 * Fired upon an attempt to reconnect
 * @param {Number} reconnectionAttemptNumber
 */
function onReconnecting(reconnectionAttemptNumber) {
	updateStatus('onReconnecting - reconnectionAttemptNumber - ' + reconnectionAttemptNumber);
}

/**
 * Fired upon a reconnection attempt error
 * @param {Object} error
 */
function onReconnectError(error) {
	updateStatus('onReconnectError - error - ' + JSON.stringify(error));
}

/**
 * Fired when couldn’t reconnect within `reconnectionAttempts`
 */
function onReconnectFailed() {
	updateStatus('onReconnectFailed');
}

function updateStatus(status) {

	console.log('status:', status);
}