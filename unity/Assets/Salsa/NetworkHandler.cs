using UnityEngine;
using System;
using BestHTTP;
using BestHTTP.SocketIO;

public class NetworkHandler : MonoBehaviour {

	SocketManager manager;
	
	// Use this for initialization
	void Start () {
		
		Debug.Log("Start");

		manager = new SocketManager(new Uri("http://localhost:3000/socket.io/"));


		manager.Socket.On("connect", OnConnect);
		manager.Socket.On("connect_error", OnConnectError);
		manager.Socket.On("connect_timeout", OnConnectTimeout);


		manager.Socket.On("fall", OnFall);
		manager.Socket.On("rotate", OnRotate);
		manager.Socket.On("newSalsa", OnNewSalsa);
	}

	void OnNewSalsa(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnNewSalsa, id: " + args[0]);
	}
	
	void OnFall(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnFall, id: " + args[0]);
	}

	void OnRotate(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnRotate, id: " + args[0] + ", angle: " + args[1]);
	}

	void OnConnect(Socket socket, Packet packet, params object[] args) {

		manager.Socket.Emit("connectCanvas");
		Debug.Log("OnConnect");
	}

	void OnConnectError(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnConnectError");
	}

	void OnConnectTimeout(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnConnectTimeout");
	}
}
