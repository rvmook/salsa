var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

var io = require('socket.io')(http);
var connectedSalsas = {};
var _canvasSockets = {};

io.on('connection', function(socket){

	socket.on('connectCanvas', function(){

		_canvasSockets[socket.id] = socket;
		io.to(socket.id).emit('canvasConnected', connectedSalsas);

		socket.on('disconnect', function(){

			delete _canvasSockets[socket.id];
		});
	});

	socket.on('connectSalsa', function(){

		console.log('connectSalsa');

		var id = socket.id;
		connectedSalsas[id] = {id:id};

		io.to(id).emit('salsaConnectedAs', id);
		emitToCanvas('newSalsa', [id]);
		socket.on('disconnect', function(){

			console.log('disconnectSalsa', id);

			emitToCanvas('fall', [id]);

			delete connectedSalsas[id];
		});

		socket.on('rotate', function(angle){

			console.log('rotate', angle);
			emitToCanvas('rotate', [id, angle]);
		});
	});
});

function emitToCanvas(message, params) {

	var key;

	console.log('emitToCanvas', message, params);

	for(key in _canvasSockets) {

		console.log('key', key);
		if(_canvasSockets.hasOwnProperty(key)) {

			io.to(key).emit.apply(io.to(key), [message].concat(params));
		}
	}
}


http.listen(port, function(){
	console.log('Sample Application Listening on Port ' + port);
});