import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x00000000, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
// const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(0, 0, 2);
// orbit.update();

const uniforms = {
  u_time: { type: "float", value: 0.0 },
  u_resolution: {
    type: "v2",
    value: new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    ).multiplyScalar(window.devicePixelRatio),
  },
  u_mouse: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
  u_scrollY: { type: "float", value: 0.0 },
};

window.addEventListener("mousemove", (e) => {
  uniforms.u_mouse.value.x = e.screenX / window.innerWidth;
  uniforms.u_mouse.value.y = e.screenY / window.innerHeight;
});

window.addEventListener("scroll", (e) => {
  uniforms.u_scrollY.value = window.scrollY / window.innerHeight;
});

const geometry = new THREE.PlaneGeometry(10, 10, 30, 30);
const material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShader").textContent,
  wireframe: true,
  uniforms,
});
const mesh = new THREE.Mesh(geometry, material);

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

scene.add(mesh);

// scene.add(cube);
// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

const clock = new THREE.Clock();
function animate() {
  uniforms.u_time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
