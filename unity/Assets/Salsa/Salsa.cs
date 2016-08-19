using UnityEngine;
using System.Collections;

public class Salsa : MonoBehaviour {


	public float rotationSpeed = 20f;
	private Vector3 mousePosition;

	Transform rotationLocal;

	Vector3 toAngle;
	Rigidbody rb;
	public float speed = 10f;
	bool isFalling = false;
	float destAngleY = 0f;
	float minX;
	float maxX;
	float minY;
	float maxY;

	void Start() {

		rotationLocal = transform.Find("RotationLocal");

		rb = GetComponent<Rigidbody>();
//		rb.velocity = new Vector3(1f, 1f, 0);

		prevLoc = transform.position;


		Vector3 size = GetComponentInChildren<Renderer>().bounds.size;

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
}
