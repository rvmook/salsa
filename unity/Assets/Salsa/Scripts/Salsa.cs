using UnityEngine;
using System.Collections;

public class Salsa : MonoBehaviour {


	public float rotationSpeed = 20f;
	private Vector3 mousePosition;

	Transform rotationLocal;

	Vector3 toAngle;
	Rigidbody rb;
	Renderer renderer;


	bool isWrappingX = false;
	bool isWrappingY = false;

	public float speed = 10f;
	bool isFalling = false;
	float destAngleY = 0f;
	float minX;
	float maxX;
	float minY;
	float maxY;

	void Start() {

		rotationLocal = transform.Find("SalsaModel");
		renderer = GetComponentInChildren<Renderer>();

		rb = GetComponent<Rigidbody>();
//		rb.velocity = new Vector3(1f, 1f, 0);

		prevLoc = transform.position;


		Vector3 size = renderer.bounds.size;

		float halfWidth = size.x/2;
		float halfHeight = size.y/2;
		float zDistance = transform.position.z - Camera.main.transform.position.z;

		minX = Camera.main.ViewportToWorldPoint(new Vector3(0,0,zDistance)).x + halfWidth;
		maxX = Camera.main.ViewportToWorldPoint(new Vector3(1,0,zDistance)).x - halfWidth;

		minY = Camera.main.ViewportToWorldPoint(new Vector3(0,0,zDistance)).y + halfHeight;
		maxY = Camera.main.ViewportToWorldPoint(new Vector3(0,1,zDistance)).y - halfHeight;



	}

	private Vector3 curLoc;
     private Vector3 prevLoc;

    // Update is called once per frame
    void Update () {  

		if(!isFalling) {

			Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
			mousePos.z = transform.position.z;

			Quaternion pointTo = Quaternion.LookRotation(Vector3.forward, mousePos - transform.position);

			transform.rotation = Quaternion.Lerp(transform.rotation, pointTo, Time.deltaTime * 2f);


			transform.position += transform.up * Time.deltaTime * speed;

			rotationLocal.localEulerAngles = new Vector3(0, destAngleY, 0);

			ScreenWrap();
		}
    }

	public void Rotate(float newAngleY) {

		destAngleY = restAngle(newAngleY);
    }

    float restAngle(float angle) {

    	if(angle < 0) {

			return 360 + (angle % 360);

    	} else {

			return angle % 360;
		}
    }

	public void fall() {

		isFalling = true;
		rb.useGravity = true;
	}

	void ScreenWrap() {

		bool isVisible = renderer.isVisible;
	 
	    if(isVisible)
	    {
	        isWrappingX = false;
	        isWrappingY = false;
	        return;
	    }
	 
	    if(isWrappingX && isWrappingY) {
	        return;
	    }
	 
	    var cam = Camera.main;
	    var viewportPosition = cam.WorldToViewportPoint(transform.position);
	    var newPosition = transform.position;
	 
	    if (!isWrappingX && (viewportPosition.x > 1 || viewportPosition.x < 0)) {
	        newPosition.x = -newPosition.x;
	 
	        isWrappingX = true;
	    }
	 
	    if (!isWrappingY && (viewportPosition.y > 1 || viewportPosition.y < 0)) {
	        newPosition.y = -newPosition.y;
	 
	        isWrappingY = true;
	    }
	 
	    transform.position = newPosition;
	}
}
