//import * as THREE from 'three';
/*
import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  LinearEncoding,
  LoaderUtils,
  LoadingManager,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  SkeletonHelper,
  Vector3,
  WebGLRenderer
} from 'three';
import { GUI } from 'dat.gui';
*/
const THREE = require('three')
import { TrackballControls } from 'three/examples/js/controls/TrackballControls.js';
const dat = require('dat.gui')

var scene, camera, renderer, controls, axis, gui;

const init = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#00A26D", 25, 40);

  camera = new THREE.PerspectiveCamera(45,ratio, 0.1, 300);
  camera.position.set(10, -10, 5);

  // dat.GUI()
  gui = new dat.GUI();
  gui.add(camera.position, 'z', 0, 800);

  // camera controls
  //controls = new THREE.OrbitControls(camera);
  controls = new THREE.TrackballControls(camera, renderer.domElement);

  // axis helper
  axis = new THREE.AxisHelper(5);
  scene.add(axis);

  renderer.setClearColor('#00A26D');
  renderer.setSize(width, height);

  document.getElementById('webgl').append(renderer.domElement);

  const sphere = getSphere(50, 32, 16, 0xffcc00);
  const pointLight = getPointLight(0xffffff, 1, 1000);

  ground = new THREE.Mesh(
    new THREE.PlaneGeometry( 100, 100, 100, 100 ),
    new THREE.MeshBasicMaterial( { color: 0x0, wireframe: true } ) );
  ground.position.z = -0.01;
  scene.add(ground);

  //scene.add(sphere);
  scene.add(pointLight);
  pointLight.position.set(200, 0, 25);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    sphere.position.y = 100 * Math.abs(Math.cos(Date.now() * 0.01));
  };

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
    animate();
    gui.open();
  };
  render();
};

const getSphere = (radius, width, height, color) => {
  let geometry = new THREE.SphereGeometry(radius, width, height);
  let material = new THREE.MeshLambertMaterial({ color });
  return new THREE.Mesh(geometry, material);
};

const getPointLight = (color, intensity, distance) => {
  let light = new THREE.PointLight(color, intensity, distance);
  return light;
};

init();
