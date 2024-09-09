import * as THREE from './node_modules/three/build/three.module.min.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from './node_modules/three/examples/jsm/webxr/ARButton.js';

let camera, scene, renderer;
let reticle, model;
let hitTestSource = null;
let hitTestSourceRequested = false;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(ARButton.createButton(renderer, {
        requiredFeatures: ['hit-test']
    }));

    window.addEventListener('resize', onWindowResize, false);

    // Load the model
    const loader = new GLTFLoader();
    loader.load("./assets/model/untitled.glb", function (gltf) {
        model = gltf.scene;
        model.scale.set(0.4, 0.4, 0.4);
        model.rotation.y = -Math.PI / 2;
        model.visible = false;
        scene.add(model);
    });

    // Initialize the reticle
    initReticle();

    // Session event listeners
    renderer.xr.addEventListener('sessionstart', onSessionStart);
    renderer.xr.addEventListener('sessionend', onSessionEnd);
}

function initReticle() {
    const geometry = new THREE.RingGeometry(0.1, 0.11, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    reticle = new THREE.Mesh(geometry, material);
    reticle.rotation.x = -Math.PI / 2;
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
}

function onSessionStart() {
    const session = renderer.xr.getSession();
    session.addEventListener('select', onSelect);

    // Request hit-test source
    session.requestReferenceSpace('viewer').then((referenceSpace) => {
        session.requestHitTestSource({ space: referenceSpace }).then((source) => {
            hitTestSource = source;
            console.log('Hit test source requested successfully.');
        }).catch((error) => {
            console.error('Error requesting hit test source:', error);
        });
    }).catch((error) => {
        console.error('Error requesting reference space:', error);
    });

    hitTestSourceRequested = true;
}

function onSessionEnd() {
    hitTestSourceRequested = false;
    hitTestSource = null;
    if (model) {
        model.visible = false;
    }
    if (reticle) {
        reticle.visible = false;
    }
}

function onSelect() {
    if (reticle.visible && model) {
        model.position.setFromMatrixPosition(reticle.matrix);
        model.visible = true;
    }
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
    if (hitTestSourceRequested && frame) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const hitPose = hit.getPose(renderer.xr.getReferenceSpace());

            if (hitPose) {
                // Create a matrix from the hit test pose
                const matrix = new THREE.Matrix4().fromArray(hitPose.transform.matrix);

                // Extract the normal vector from the matrix
                const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
                const normal = new THREE.Vector3(0, 1, 0).applyMatrix3(normalMatrix).normalize();

                console.log('Normal vector:', normal);

                // Only show the reticle if the Y component of the normal is near 1 (horizontal surface)
                if (Math.abs(normal.y) > 0.999) {  // Adjust this threshold for more strict horizontal checking
                    // reticle.visible = true;
                    reticle.matrix.fromArray(hitPose.transform.matrix);
                    // const angle = normal.angleTo(new THREE.Vector3(0, 1, 0));
                    // if (angle < Math.PI / 4) { // Check if normal is close to vertical
                    //     reticle.visible = true;
                    // } else {
                    //     reticle.visible = false;
                    // }
                } else {
                    reticle.visible = false;
                }
            }
        } else {
            reticle.visible = false;
            console.log('No hit test results.');
        }
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
