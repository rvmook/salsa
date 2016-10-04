var socketHandler = require('./socketHandler'),
	TOTAL_ASSETS = 2,
	_wrapperEl,
	_currentRotation,
	_camera,
	_ambient,
	_scene,
	_rotated,
	_renderer,
	_salsa,
	_rotationRadians = 3.14159,
	_canvasWidth,
	_canvasHeight;

function init(rotated) {

	_rotated = rotated;
	_wrapperEl = document.querySelector('.wrapper');

	_canvasWidth = _wrapperEl.offsetWidth;
	_canvasHeight = _wrapperEl.offsetHeight;


	_camera = new THREE.PerspectiveCamera(45, _canvasWidth / _canvasHeight, 1, 2000);
	_camera.position.z = 250;

	// _scene
	_scene = new THREE.Scene();
	_scene.background = new THREE.Color(0xffffff);

	// lights
	_ambient = new THREE.AmbientLight(0xffffff);
	_scene.add(_ambient);


	_renderer = new THREE.WebGLRenderer();
	_renderer.setPixelRatio(window.devicePixelRatio);
	_renderer.setSize(_canvasWidth, _canvasHeight);
	_renderer.render(_scene, _camera);

	_wrapperEl.appendChild(_renderer.domElement);
}

function preload(progress, loaded) {

	var loadingManager = new THREE.LoadingManager(),
		imageLoader = new THREE.ImageLoader(loadingManager),
		objLoader = new THREE.OBJLoader(loadingManager),
		texture = new THREE.Texture(),
		imageProgress = 0,
		objProgress = 0;

	loadingManager.onLoad = loaded;

	objLoader.load( '/assets/3d/obj/SalsaModel.obj', onModelLoaded, onModelProgress);
	imageLoader.load( '/assets/3d/textures/SalsaTexture.jpg', onTextureLoaded, onImgProgress);

	function onImgProgress(xhr) { imageProgress = getProgress(xhr); updateTotalProgress(); }
	function onModelProgress(xhr) { objProgress = getProgress(xhr); updateTotalProgress(); }
	function getProgress(xhr) { return xhr.loaded / xhr.total / TOTAL_ASSETS; }

	function updateTotalProgress() {

		var totalProgress = objProgress + imageProgress;

		progress(totalProgress);
	}

	function onTextureLoaded(image) {

		texture.image = image;
		texture.needsUpdate = true;
	}

	function onModelLoaded(model) {

		model.traverse(function(child) {

			if (child instanceof THREE.Mesh) {

				child.material.map = texture;
			}
		});

		model.position.y = -50;
		model.scale.set(20,20,20);
		_salsa = model;
	}
}

function render() {

	_salsa.rotation.set(0, _rotationRadians, 0);
	_camera.lookAt(_scene.position);

	_renderer.render(_scene, _camera);

	requestAnimationFrame(render);
}

function start() {
	_scene.background = new THREE.Color(0x99D5D6);
	_scene.add(_salsa);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	render();
}

function onWindowResize() {

	_canvasWidth = window.innerWidth;
	_canvasHeight = window.innerHeight;

	_camera.aspect = _canvasWidth / _canvasHeight;
	_camera.updateProjectionMatrix();

	_renderer.setSize(_canvasWidth, _canvasHeight);
}

function onDocumentMouseMove( event ) {

	var newRotationDeg = roundTo(360 * (event.clientX / window.innerWidth), 1);

	if(_currentRotation !== newRotationDeg) {

		_currentRotation = newRotationDeg;
		_rotationRadians = _currentRotation * (Math.PI/180);

		_rotated.dispatch(_currentRotation);
	}

}

function roundTo(value, round) {

	return Math.round(value / round) * round;
}

exports.init = init;
exports.preload = preload;
exports.start = start;



