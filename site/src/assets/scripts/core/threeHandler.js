var controller = require('./controller'),
	globals = require('./globals'),
	Signal = require('../libs/signals'),
	ajaxRequest = require('../utils/ajaxRequest'),
	TOTAL_ASSETS = 1,
	_wrapperEl,
	_camera,
	_ambient,
	_scene,
	_renderer,
	_salsa,
	_pivot,
	progressUpdated = new Signal(),
	_rotationRadians = {x:90 * (Math.PI/180),y:3.14159,z:0},
	_canvasWidth,
	_canvasHeight;

function init() {

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

function preload() {

	var loadingManager = new THREE.LoadingManager(),
		// imageLoader = new THREE.ImageLoader(loadingManager),
		// objLoader = new THREE.OBJLoader(loadingManager),
		texture = new THREE.Texture(),
		imageProgress = 0,
		objProgress = 0;

	console.log('globals', globals.salsa);

	var asset = 'skin-' + globals.salsa.skin + '-bikini-' + globals.salsa.bikini + '.jpg';

	// var loader = new THREE.JSONLoader(loadingManager);
	var materials = [{

		'colorDiffuse' : [0.6400000190734865, 0.6400000190734865, 0.6400000190734865],

		'opacity': 1.0,
		'mapDiffuseRepeat': [1, 1],
		'depthTest': true,
		'mapDiffuseWrap': ['repeat', 'repeat'],
		'blending': 'NormalBlending',
		'mapDiffuseAnisotropy': 4,
		'shading': 'Phong',
		'transparent': false,
		'depthWrite': true,
		'DbgName' : 'WHITE',
		'vertexColors': false,
		'mapDiffuse': '/textures/' + asset
	}];

	ajaxRequest('/assets/3d/salsa-crawl-stroke.json', {onProgress:onRequestProgress})
		.then(function(jsonResult){

			var result = JSON.parse(jsonResult),
				parsedObject;

			result.materials = materials;
			var jsonLoader = new THREE.JSONLoader();
			parsedObject = jsonLoader.parse(result, '/assets/3d/');

			onJsonLoaded(parsedObject.geometry, parsedObject.materials);
		})
		.fail(function(error) {
			console.error('error', error);
		});

	function onRequestProgress(progress) {

		progressUpdated.dispatch(progress);
	}

	function onJsonLoaded(geometry, materials) {

		var model = new THREE.SkinnedMesh( geometry, new THREE.MultiMaterial( materials ) );

		_salsa = model;
		progressUpdated.dispatch(1);
	}
}

function render() {

	_pivot.rotation.set(_rotationRadians.x, _rotationRadians.y, _rotationRadians.z);
	_camera.lookAt(_scene.position);

	_renderer.render(_scene, _camera);

	requestAnimationFrame(render);
}

function onRotationUpdated(x,y,z) {

	// _rotationRadians.x = x * (Math.PI/180);
	_rotationRadians.z = y * (Math.PI/180);
	// _rotationRadians.z = z * (Math.PI/180);
}

function start() {

	_pivot = new THREE.Object3D();
	_pivot.add(_salsa);



	_scene.background = new THREE.Color(0x99D5D6);
	_scene.add(_pivot);

	controller.rotationUpdated.add(onRotationUpdated);
	window.addEventListener('resize', onWindowResize, false);
	render();
}

function onWindowResize() {

	_canvasWidth = _wrapperEl.offsetWidth;
	_canvasHeight = _wrapperEl.offsetHeight;

	_camera.aspect = _canvasWidth / _canvasHeight;
	_camera.updateProjectionMatrix();

	_renderer.setSize(_canvasWidth, _canvasHeight);
}


exports.init = init;
exports.progressUpdated = progressUpdated;
exports.preload = preload;
exports.start = start;



