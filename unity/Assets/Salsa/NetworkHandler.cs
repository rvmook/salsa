using UnityEngine;
using System;
using BestHTTP;
using BestHTTP.SocketIO;

public class NetworkHandler : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
		var manager = new SocketManager(new Uri("http://localhost:3000/socket.io/"));

		manager.Socket.On("chat", OnChat);
	}
	
	void OnChat(Socket socket, Packet packet, params object[] args) {

		Debug.Log(args[0]);
	}
}
