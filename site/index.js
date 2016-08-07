var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var counter = 0;
var connectedSalsas = {};
var _canvasSocket;

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){

	socket.on('connectCanvas', function(){

		console.log('connectCanvas');

		_canvasSocket = socket;

		socket.on('disconnect', function(){

			_canvasSocket = false;
		});
	});

	socket.on('connectSalsa', function(){

		console.log('connectSalsa');

		var id = getUniqueId();
		connectedSalsas[id] = {id:id};

		io.to(socket.id).emit('salsaConnectedAs', id);
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

	console.log('emitToCanvas', message, params, Boolean(_canvasSocket));
	if(_canvasSocket) {


		io.to(_canvasSocket.id).emit.apply(io.to(_canvasSocket.id), [message].concat(params));
	}
}

function getUniqueId() {

	return String(counter++);
}

http.listen(3000, function(){
	console.log('listening on *:3000');
});
