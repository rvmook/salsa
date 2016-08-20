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

		String id = (String)args[0];
		Debug.Log("OnFall, id: " + id);

		if(salsas.ContainsKey(id)) {

			Salsa fallingSalsa = salsas[id].GetComponent<Salsa>();

			fallingSalsa.fall();	   
		}
	}

	void OnRotate(Socket socket, Packet packet, params object[] args) {

		String id = (String)args[0];
		double angle = (double)args[1];

		Debug.Log("OnRotate, id: " + id);

		if(salsas.ContainsKey(id)) {

			Salsa rotatingSalsa = salsas[id].GetComponent<Salsa>();

			rotatingSalsa.Rotate((float)angle);
		}
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
