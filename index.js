const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const canvas = document.querySelector('.webgl');

renderer.setSize(window.innerWidth, window.innerHeight);


document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2, 32, 32);
const globeMaterial = new THREE.MeshPhongMaterial({
    roughness: 1, metalness: 0,
    map: THREE.ImageUtils.loadTexture("images/earthmap.jpg"),
    bumpMap: THREE.ImageUtils.loadTexture("images/earthbump.jpg"),
    bumpScale: 0.1
});
const sphere = new THREE.Mesh(geometry, globeMaterial,);
scene.add(sphere);


const cloudGeometry = new THREE.SphereGeometry(2.1, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("images/earthCloud.png"),
    transparent: true
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const starGeometry = new THREE.SphereGeometry(55, 64, 64)
const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("images/galaxy.png"),
    side: THREE.BackSide
})
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
    sphere.rotation.y -= 0.0015;//- is anticlock wise
    sphere.rotation.x -= 0.00001;//- is anticlock wise
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.001;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;//aspect ratio
    camera.updateProjectionMatrix();//updates the project
    renderer.setSize(window.innerWidth, window.innerHeight);//sets again the height and width for renderer on resize
}

window.addEventListener('resize', onWindowResize, false);


animate();