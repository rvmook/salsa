var _wrapperEl,
	_camera,
	_ambient,
	_scene,
	_renderer,
	_salsa,
	_directionalLight,
	_rotationRadians = 3.14159,
	_canvasWidth,
	_canvasHeight;

function init() {

	var loadingManager,
		texture;

	_wrapperEl = document.querySelector('.wrapper');

	_canvasWidth = _wrapperEl.offsetWidth;
	_canvasHeight = _wrapperEl.offsetHeight;


	_camera = new THREE.PerspectiveCamera(45, _canvasWidth / _canvasHeight, 1, 2000);
	_camera.position.z = 250;

	// _scene
	_scene = new THREE.Scene();
	_scene.background = new THREE.Color(0x99D5D6);

	// lights
	_ambient = new THREE.AmbientLight(0x101030);
	_scene.add(_ambient);

	_directionalLight = new THREE.DirectionalLight(0xffeedd);
	_scene.add(_directionalLight);
	_directionalLight.position.set(0, 0, 1);

	_renderer = new THREE.WebGLRenderer();
	_renderer.setPixelRatio(window.devicePixelRatio);
	_renderer.setSize(_canvasWidth, _canvasHeight);
	_wrapperEl.appendChild(_renderer.domElement);



	// texture

	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total) {

		console.log(item, loaded, total);

		if(loaded === total) {

			document.addEventListener('mousemove', onDocumentMouseMove, false);
			window.addEventListener('resize', onWindowResize, false);
			render();
		}
	};

	texture = new THREE.Texture();

	new THREE.ImageLoader(loadingManager)
		.load( '/assets/3d/textures/SalsaTexture.jpg', onTextureLoaded);
	new THREE.OBJLoader(loadingManager)
		.load( '/assets/3d/obj/SalsaModel.obj', onModelLoaded);


	// model.setMaterials(materials);


	function onTextureLoaded(image) {

		texture.image = image;
		texture.needsUpdate = true;
	}

	function onModelLoaded(model) {

		model.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.map = texture;
			}
		} );

		model.position.y = -50;

		model.scale.set(20,20,20);
		_scene.add(model);

		_salsa = model;
	}
}

function onWindowResize() {

	_canvasWidth = window.innerWidth;
	_canvasHeight = window.innerHeight;

	_camera.aspect = _canvasWidth / _canvasHeight;
	_camera.updateProjectionMatrix();

	_renderer.setSize(_canvasWidth, _canvasHeight);
}

function onDocumentMouseMove( event ) {

	var rotationDeg = 360 * (event.clientX / _canvasWidth);

	_rotationRadians = rotationDeg * (Math.PI/180);
}

//

function render() {

	// _camera.position.x += ( mouseX - _camera.position.x ) * .05;
	// _camera.position.y += ( - mouseY - _camera.position.y ) * .05;

	_salsa.rotation.set(0, _rotationRadians, 0);

	_camera.lookAt(_scene.position);


	_renderer.render(_scene, _camera);

	requestAnimationFrame(render);
}

exports.init = init;