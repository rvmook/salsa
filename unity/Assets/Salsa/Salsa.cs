using UnityEngine;
using System.Collections;

public class Salsa : MonoBehaviour {

	public Texture BoxTexture;

	void OnGUI() {

		GUI.Box(new Rect(0, 0, Screen.width, Screen.height), BoxTexture);
    }

    public void Rotate(double angle) {

    	Debug.Log("Salsa, rotate!" + angle);
    }
}
