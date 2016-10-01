var socket = io(),
	_salsaId;

exports.init = function() {

	// Socket IO
	socket.on('connect', onConnect);
	socket.on('connect_error', onConnectError);
	socket.on('connect_timeout', onConnectTimeout);
	socket.on('reconnect', onReconnect);
	socket.on('reconnect_attempt', onReconnectAttempt);
	socket.on('reconnecting', onReconnecting);
	socket.on('reconnect_error', onReconnectError);
	socket.on('reconnect_failed', onReconnectFailed);

	socket.on('salsaConnectedAs', onSalsaConnectedAs);
};

exports.socket = socket;


/**
 * Fired upon successful Salsa connection
 * @param {String} id
 */
function onSalsaConnectedAs(id) {

	updateStatus('onSalsaConnectedAs - ' + id);
	_salsaId = id;
}

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

/**
 * Fired upon a successful connection
 */
function onConnect() {

	updateStatus('onConnect');
	socket.emit('connectSalsa');
}

/**
 * Fired upon a connection error
 * @param {Object} error
 */
function onConnectError(error) {
	updateStatus('onConnectError - error - ', JSON.stringify(error));
}

/**
 * Fired upon a connection timeout
 */
function onConnectTimeout() {

	updateStatus('onConnectTimeout');
}

function updateStatus(status) {

	console.log('status:', status);
}