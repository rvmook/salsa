using UnityEngine;
using System;
using BestHTTP;
using BestHTTP.SocketIO;

public class NetworkManager : MonoBehaviour {

	// Use this for initialization
	void Start () {


		HTTPRequest request = new HTTPRequest(new Uri("https://google.com"), OnRequestFinished);

		request.Send();


		var manager = new SocketManager(new Uri("http://localhost:3000/socket.io/"));

		manager.Socket.On("chat", OnChat);
	}

	void OnChat(Socket socket, Packet packet, params object[] args) {

		// args[0] is the nick of the sender
		// args[1] is the message



		Debug.Log(args[0]);
	}
	
	void OnRequestFinished(HTTPRequest request, HTTPResponse response) {
		Debug.Log("Request Finished! Text received: " + response.DataAsText);
	}
}
