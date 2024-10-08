import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";

import * as THREE from "three";

let scene, camera, renderer, controls;

let planetSun,
  planetMercury,
  planetVenus,
  planetEarth,
  planetMars,
  planetJupiter,
  planetSaturn,
  planetUranus,
  planetNeptune;

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;

let mercury_revolution_speed = 2;
let venus_revolution_speed = 1.5;
let earth_revolution_speed = 1;
let mars_revolution_speed = 0.8;
let jupiter_revolution_speed = 0.7;
let saturn_revolution_speed = 0.6;
let uranus_revolution_speed = 0.5;
let neptune_revolution_speed = 0.4;

const SUN_RADIUS = 20;
const EARTH_RADIUS = 4;
const MERCURY_RADIUS = 2;
const VENUS_RADIUS = 3;
const MARS_RADIUS = 3.5;
const JUPITER_RADIUS = 10;
const SATURN_RADIUS = 8;
const URANUS_RADIUS = 6;
const NEPTUNE_RADIUS = 5;

const createSkyBoxMaterialArray = () => {
  const skyboxImagepaths = [
    "img/skybox/space_ft.png",
    "img/skybox/space_bk.png",
    "img/skybox/space_up.png",
    "img/skybox/space_dn.png",
    "img/skybox/space_rt.png",
    "img/skybox/space_lf.png",
  ];

  const meshBasicMaterialArray = skyboxImagepaths.map((img) => {
    const texture = new THREE.TextureLoader().load(img);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });

  return meshBasicMaterialArray;
};

const setupSkyBox = () => {
  const meshBasicMaterialArray = createSkyBoxMaterialArray();

  const geo = new THREE.BoxGeometry(1000, 1000, 1000);

  const skybox = new THREE.Mesh(geo, meshBasicMaterialArray);

  scene.add(skybox);
};

const loadPlanet = (
  textureImage,
  radius,
  widthSegment,
  heightSegment,
  meshType
) => {
  const texture = new THREE.TextureLoader().load(textureImage);
  const geo = new THREE.SphereGeometry(radius, widthSegment, heightSegment);

  const meshMaterial =
    meshType === "BASIC"
      ? new THREE.MeshBasicMaterial({ map: texture })
      : new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geo, meshMaterial);

  return mesh;
};

const createPlanetRing = (innerRadius) => {
  const geo = new THREE.RingGeometry(innerRadius, innerRadius + 1, 100);

  const material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, material);

  mesh.rotation.x = Math.PI / 2;

  scene.add(mesh);
};

const planetRevolver = (time, planet, speed, orbitRadius) => {
  const ORBIT_SPEED_MULTIPLIER = 0.001;

  const planetAngle = time * ORBIT_SPEED_MULTIPLIER * speed;

  console.log(planetAngle);

  planet.position.x =
    planetSun.position.x + orbitRadius * Math.sin(planetAngle);
  planet.position.z =
    planetSun.position.z + orbitRadius * Math.cos(planetAngle);
};

// const animateCamera = (time, planet) => {
//   const SPEED_MULTIPLIER = 0.000001;

//   const angle = time * SPEED_MULTIPLIER;

//   // camera.position.x = planet.position.x + angle;
//   // camera.position.y = planet.position.y + angle;
//   // camera.position.z = planet.position.z + angle;

//   // camera.rotation.x = 0.5 + Math.tan(angle);
//   // camera.rotation.y = -0.5 + Math.tan(angle);
//   // camera.rotation.z = -0.5 + Math.tan(angle);

//   camera.lookAt(planet.position);
// };

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  setupSkyBox();

  planetSun = loadPlanet("img/sun_hd.jpg", SUN_RADIUS, 100, 100, "BASIC");
  planetMercury = loadPlanet(
    "img/mercury_hd.jpg",
    MERCURY_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetVenus = loadPlanet(
    "img/venus_hd.jpg",
    VENUS_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetEarth = loadPlanet(
    "img/earth_hd.jpg",
    EARTH_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetMars = loadPlanet("img/mars_hd.jpg", MARS_RADIUS, 100, 100, "STANDARD");
  planetJupiter = loadPlanet(
    "img/jupiter_hd.jpg",
    JUPITER_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetSaturn = loadPlanet(
    "img/saturn_hd.jpg",
    SATURN_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetUranus = loadPlanet(
    "img/uranus_hd.jpg",
    URANUS_RADIUS,
    100,
    100,
    "STANDARD"
  );
  planetNeptune = loadPlanet(
    "img/neptune_hd.jpg",
    NEPTUNE_RADIUS,
    100,
    100,
    "STANDARD"
  );

  scene.add(planetSun);
  scene.add(planetMercury);
  scene.add(planetVenus);
  scene.add(planetEarth);
  scene.add(planetMars);
  scene.add(planetJupiter);
  scene.add(planetSaturn);
  scene.add(planetUranus);
  scene.add(planetNeptune);

  createPlanetRing(mercury_orbit_radius);
  createPlanetRing(venus_orbit_radius);
  createPlanetRing(earth_orbit_radius);
  createPlanetRing(mars_orbit_radius);
  createPlanetRing(jupiter_orbit_radius);
  createPlanetRing(saturn_orbit_radius);
  createPlanetRing(uranus_orbit_radius);
  createPlanetRing(neptune_orbit_radius);

  const sunLight = new THREE.PointLight(0xffffff, 15000, 500000);
  sunLight.position.copy(planetSun.position);
  scene.add(sunLight);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "c";

  document.body.appendChild(renderer.domElement);

  camera.position.z = 150;
  camera.position.y = 150;
  // camera.position.z = 150;
  camera.rotation.x = Math.PI / 4;
  // camera.position.y = 50;
  // camera.rotation.x = -20;

  controls = new OrbitControls(camera, renderer.domElement);

  controls.minDistance = 12;
  controls.maxDistance = 1000;

  controls.dumpingFactor = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.25;
  controls.enableZoom = true;
}

const animate = (time) => {
  requestAnimationFrame(animate);

  controls.update(0.05);

  renderer.render(scene, camera);

  planetRevolver(
    time,
    planetMercury,
    mercury_revolution_speed,
    mercury_orbit_radius,
    "Mercury"
  );
  planetRevolver(
    time,
    planetVenus,
    venus_revolution_speed,
    venus_orbit_radius,
    "Venus"
  );
  planetRevolver(
    time,
    planetEarth,
    earth_revolution_speed,
    earth_orbit_radius,
    "Earth"
  );
  planetRevolver(
    time,
    planetMars,
    mars_revolution_speed,
    mars_orbit_radius,
    "Mars"
  );
  planetRevolver(
    time,
    planetJupiter,
    jupiter_revolution_speed,
    jupiter_orbit_radius,
    "Jupiter"
  );
  planetRevolver(
    time,
    planetSaturn,
    saturn_revolution_speed,
    saturn_orbit_radius,
    "Saturn"
  );
  planetRevolver(
    time,
    planetUranus,
    uranus_revolution_speed,
    uranus_orbit_radius,
    "Uranus"
  );
  planetRevolver(
    time,
    planetNeptune,
    neptune_revolution_speed,
    neptune_orbit_radius,
    "Neptune"
  );

  // animateCamera(time, planetNeptune);
  // animateCamera(time, planetUranus);
  // animateCamera(time, planetSaturn);
  // animateCamera(time, planetJupiter);
  // animateCamera(time, planetMars);
  // animateCamera(time, planetEarth);
  // animateCamera(time, planetVenus);
  // animateCamera(time, planetMercury);

  // camera.lookAt(planetSun.position);
  // camera.position.copy(planetNeptune.position);
  // camera.position.y = 50;
  // camera.position.x = 50;
};

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

const btnSwitchPlanets = document.getElementsByClassName("btn-switch-planet");

for (let pt of btnSwitchPlanets) {
  pt.addEventListener("click", (event) => {
    const planetName = event.target.getAttribute("data-name");

    if (planetName === "EARTH") {
      camera.lookAt(planetEarth.position);
    }
  });
}

init();

animate(0);
