var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var communicatedSalsas = '{}';

app.use(express.static('public'));

var io = require('socket.io')(http);
var connectedSalsas = {};
var _canvasSockets = {};

var idCounter = 1;

function getNewId() {

	return String(idCounter++);
}

io.on('connection', function(socket){

	socket.on('disconnectSalsa', onDisconnectSalsa);
	socket.on('rotateSalsa', onRotateSalsa);

	socket.on('connectCanvas', function(){

		_canvasSockets[socket.id] = socket;
		socket.emit('canvasConnected', connectedSalsas);

		socket.on('disconnect', function(){

			delete _canvasSockets[socket.id];
		});
	});

	socket.on('connectSalsa', function(){

		socket.on('rotateSalsa', onRotateSalsa);
		newSalsa(socket, getNewId());
	});
});


function newSalsa(socket, id) {

	var salsa = {
		id:id,
		angle: 0
	};

	connectedSalsas[id] = salsa;

	socket.on('disconnect', disconnect);

	socket.emit('salsaConnectedAs', id);

	sendSalsasToCanvas();

	function disconnect(){
		onDisconnectSalsa(id);
	}
}

function onRotateSalsa(rotatedId, angle) {

	if(connectedSalsas.hasOwnProperty(rotatedId)) {

		connectedSalsas[rotatedId].angle = angle;
		sendSalsasToCanvas();
	}
}

function onDisconnectSalsa(disconnectedId) {

	if(connectedSalsas.hasOwnProperty(disconnectedId)) {

		delete connectedSalsas[disconnectedId];

		sendSalsasToCanvas();
	}
}

function sendSalsasToCanvas() {

	if(communicatedSalsas !== JSON.stringify(connectedSalsas)) {

		communicatedSalsas = JSON.stringify(connectedSalsas);
		emitToCanvas('updateSalsas', [connectedSalsas]);
	}
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