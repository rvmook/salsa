using UnityEngine;
using System.Collections;

public class Salsa : MonoBehaviour {


	public float rotationSpeed = 2f;
	Vector3 fakeAngle;
	Vector3 toAngle;

	float speed = 1f;
	bool isGoingLeft;
	bool isGoingUp;
	bool isRotating;
	float angleY = 0f;
	float minX;
	float maxX;
	float minY;
	float maxY;

	void Start() {

		
		fakeAngle = transform.localEulerAngles;

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

		if(isRotating) {

			rotateToDest();
		}
    }

	public void Rotate(float newAngleY) {

		isRotating = true;

		toAngle = fakeAngle;
		toAngle.y = newAngleY;
    }

	void rotateToDest() {
			
		if(Vector3.Distance(transform.eulerAngles, toAngle) > 0.01f) {

			fakeAngle = Vector3.Lerp(fakeAngle, toAngle, Time.deltaTime * rotationSpeed);

		} else {

			fakeAngle = toAngle;
			isRotating = false;
		}

		transform.eulerAngles = new Vector3(restAngle(fakeAngle.x), restAngle(fakeAngle.y), restAngle(fakeAngle.z));
    }

    float restAngle(float angle) {

    	if(angle < 0) {

			return 360 + (angle % 360);

    	} else {

			return angle % 360;
		}
    }
}
