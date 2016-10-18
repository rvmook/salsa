var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var communicatedSalsas = '';

app.use(express.static('public'));

var io = require('socket.io')(http);
var _connectedSalsas = [];
var _canvasSockets = {};

function getNewSalsa() {

	var SWIM_WEAR = [0,1,2,3,4],
		SKIN_TONE = [0,0,0,0,0,1,1,1,2,2],
		GOGGLE_TYPE = [0,1];

	return {
		suit:getRandomFromArr(SWIM_WEAR),
		skin:getRandomFromArr(SKIN_TONE),
		goggle:getRandomFromArr(GOGGLE_TYPE),
		index:_connectedSalsas.length,
		swimming:1,
		rotation:0,
		direction:0
	}
}

function getRandomFromArr(arr) {
	var length = arr.length;
	return arr[Math.floor(Math.random() * length)];
}

io.on('connection', function(socket){

	socket.on('disconnectSalsa', onDisconnectSalsa);
	socket.on('rotateSalsa', onRotateSalsa);

	socket.on('connectCanvas', function(){

		_canvasSockets[socket.id] = socket;

		socket.emit('canvasConnected', communicatedSalsas);

		socket.on('disconnect', function(){

			delete _canvasSockets[socket.id];
		});
	});

	socket.on('connectSalsa', function(){

		socket.on('rotateSalsa', onRotateSalsa);
		newSalsa(socket);
	});
});


function newSalsa(socket) {

	var salsa = getNewSalsa(),
		index = salsa.index;

	_connectedSalsas.push(salsa);

	socket.on('disconnect', disconnect);

	socket.emit('salsaConnectedAs', index);

	sendSalsasToCanvas();

	function disconnect(){
		onDisconnectSalsa(index);
	}
}

function onRotateSalsa(rotatedId, rotation) {

	var rotatedId = Number(rotatedId),
		salsa = _connectedSalsas[rotatedId];

	if(salsa && Number(salsa.index) === rotatedId) {

		salsa.rotation = rotation;
		sendSalsasToCanvas();
	}
}

function onDisconnectSalsa(disconnectedIndex) {

	var salsa = _connectedSalsas[disconnectedIndex];

	if(salsa && salsa.index === disconnectedIndex) {

		salsa.swimming = false;

		sendSalsasToCanvas();
	}
}

function sendSalsasToCanvas() {

	var currentSalsas = composeSalsas();
	
	if(communicatedSalsas !== currentSalsas) {

		communicatedSalsas = currentSalsas;
		emitToCanvas('update', [communicatedSalsas]);
	}
}

function composeSalsas() {

	var i,
		string = '',
		salsa;

	for(i = 0; i < _connectedSalsas.length; i++) {

		salsa = _connectedSalsas[i];

		if(i !== 0) {

			string += ';';
		}

		string += salsa.index + ',' + salsa.suit + salsa.skin + salsa.goggle;

		if(salsa.swimming) {

			string += ',' + salsa.rotation + ',' + salsa.direction;
		}
	}

	return string;
}

function emitToCanvas(message, params) {

	var key;

	for(key in _canvasSockets) {

		if(_canvasSockets.hasOwnProperty(key)) {

			io.to(key).emit.apply(io.to(key), [message].concat(params));
		}
	}
}

http.listen(port);