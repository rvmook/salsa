using UnityEngine;
using System.Collections;

public class Salsa : MonoBehaviour {


	public Vector3 rotateAmount;  // degrees per second to rotate in each axis. Set in inspector.
	float speed = 1f;
	bool isGoingLeft;
	bool isGoingUp;
	float angleY = 0f;
	float minX;
	float maxX;
	float minY;
	float maxY;

	void Start() {

		Vector3 size = GetComponent<Renderer>().bounds.size;

		float halfWidth = size.x/2;
		float halfHeight = size.y/2;
		float zDistance = transform.position.z - Camera.main.transform.position.z;

		minX = Camera.main.ViewportToWorldPoint(new Vector3(0,0,zDistance)).x + halfWidth;
		maxX = Camera.main.ViewportToWorldPoint(new Vector3(1,0,zDistance)).x - halfWidth;

		minY = Camera.main.ViewportToWorldPoint(new Vector3(0,0,zDistance)).y + halfHeight;
		maxY = Camera.main.ViewportToWorldPoint(new Vector3(0,1,zDistance)).y - halfHeight;
	}

    // Update is called once per frame
    void Update () {  

		Vector2 offsetPos = new Vector2();
		float posX;
		float posY;

		
		
		if(isGoingLeft) {
			
			offsetPos.x = -speed;
			
		} else {
			
			offsetPos.x = speed;
		}

		if(isGoingUp) {
			
			offsetPos.y = -speed;
			
		} else {
			
			offsetPos.y = speed;
		}

		posX = Mathf.Clamp(transform.position.x + (offsetPos.x * Time.deltaTime), minX, maxX);
		posY = Mathf.Clamp(transform.position.y + (offsetPos.y * Time.deltaTime), minY, maxY);
		
		transform.position = new Vector2(posX, posY);

		
		if(posX <= minX) {

			isGoingLeft = false;			

		} else if(posX >= maxX) {
		
			isGoingLeft = true;			
		}

		if(posY <= minY) {

			isGoingUp = false;			

		} else if(posY >= maxY) {
		
			isGoingUp = true;			
		}

//		Quaternion rotation = transform.rotation;

//		float rotationY = rotation.y + 20 * Time.deltaTime;
//		float rotationZ = rotation.z + 10 * Time.deltaTime;


		transform.Rotate(new Vector3(
			1,//rotateAmount.x * Time.deltaTime,
			0,
			0//rotateAmount.z * Time.deltaTime
		),1f);
    }

    public void Rotate(float angle) {

		transform.Rotate(new Vector3(
			0,//rotateAmount.x * Time.deltaTime,
			1,
			0//rotateAmount.z * Time.deltaTime
		),angle);
    	Debug.Log("Salsa, rotate!" + angle);
    }
}
