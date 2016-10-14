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
		
		manager = new SocketManager(new Uri("http://localhost:3000/socket.io/"));
//		manager = new SocketManager(new Uri("http://salsa-env.us-east-1.elasticbeanstalk.com/socket.io/"));


		manager.Socket.On("connect", OnConnect);
		manager.Socket.On("connect_error", OnConnectError);
		manager.Socket.On("canvasConnected", OnCanvasConnected);
		manager.Socket.On("update", OnUpdateSalsas);
		manager.Socket.On("connect_timeout", OnConnectTimeout);
	}

	void OnCanvasConnected(Socket socket, Packet packet, params object[] args) {
		
		ParseSalsas((Dictionary<string, object>)args[0]);
	}

	void OnUpdateSalsas(Socket socket, Packet packet, params object[] args) {
		
		ParseSalsas((Dictionary<string, object>)args[0]);
	}

	void ParseSalsas(Dictionary<string, object> newSalsas) {
		
		foreach(KeyValuePair<string, object> salsaKv in newSalsas) {

			Dictionary<string, object> salsa = (Dictionary<string, object>)newSalsas[salsaKv.Key];

			string salsaId = (string)salsa["id"];
			double salsaAngle = (double)salsa["angle"];			

			if(salsas.ContainsKey(salsaId)) {

				Salsa rotatingSalsa = salsas[salsaId].GetComponent<Salsa>();

				rotatingSalsa.Rotate((float)salsaAngle);

			} else {

				AddSalsa(salsaId);
			}
		}
	}

	void AddSalsa(String id) {
			
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
