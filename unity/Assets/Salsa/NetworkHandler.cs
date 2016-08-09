using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

using BestHTTP;
using BestHTTP.SocketIO;

public class NetworkHandler : MonoBehaviour {

	public GameObject salsaPrefab;

	Dictionary<String, GameObject> salsas = new Dictionary<String, GameObject>();

	SocketManager manager;
	
	// Use this for initialization
	void Start () {
		
		Debug.Log("Start");

//		return;
//		manager = new SocketManager(new Uri("http://localhost:3000/socket.io/"));
		manager = new SocketManager(new Uri("http://salsa-env.us-east-1.elasticbeanstalk.com/socket.io/"));


		manager.Socket.On("connect", OnConnect);
		manager.Socket.On("connect_error", OnConnectError);
		manager.Socket.On("connect_timeout", OnConnectTimeout);

		manager.Socket.On("fall", OnFall);
		manager.Socket.On("rotate", OnRotate);
		manager.Socket.On("newSalsa", OnNewSalsa);
	}

	void OnNewSalsa(Socket socket, Packet packet, params object[] args) {

		String id = (String)args[0];

		Debug.Log("OnNewSalsa, id: " + id);

		AddSalsa(id);
	}

	void AddSalsa(String id) {

		Debug.Log("AddSalsa, id: " + id);

		GameObject salsa = (GameObject)Instantiate(salsaPrefab, transform.position,Quaternion.identity);

		salsas.Add(id, salsa);
	}

	void OnFall(Socket socket, Packet packet, params object[] args) {

		Debug.Log("OnFall, id: " + args[0]);
	}

	void OnRotate(Socket socket, Packet packet, params object[] args) {
		
		String id = (String)args[0];
		float angle = float.Parse((String)args[1]);

		Salsa rotatingSalsa = salsas[id].GetComponent<Salsa>();

		rotatingSalsa.Rotate(angle);
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
