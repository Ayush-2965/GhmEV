import * as THREE from './node_modules/three/build/three.module.min.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from './node_modules/three/examples/jsm/loaders/EXRLoader.js';
import { VRButton } from './node_modules/three/examples/jsm/webxr/VRButton.js';
import { ARButton } from './node_modules/three/examples/jsm/webxr/ARButton.js';
import { XRButton } from './node_modules/three/examples/jsm/webxr/XRButton.js';
// import { mod } from 'three/examples/jsm/nodes/Nodes.js';
// import { log } from 'three/examples/jsm/nodes/Nodes.js';

let camera, scene, renderer;
let controller, reticle;
let model = null;
let controls;



let initialFov = 70; // Starting field of view

// Variables for touch controls
let touchStartDistance = null;
let touchStartFov = initialFov;
let touchStartPosition = new THREE.Vector2();
let isTouching = false;
let touches = []; // Array to hold touch points
var hitTestSource = null;
var hitTestSourceRequested = false;
let xrSession = null;
let isAR = true;
init();

document.getElementById('start').addEventListener('click', startARSession);
document.getElementById('exit').addEventListener('click', endARSession);


function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 200);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const exrLoader = new EXRLoader();
    exrLoader.load('./assets/model/hdri/studio_small_08_1k.exr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = null;
    }, undefined, (error) => {
        console.error('An error occurred loading the EXR:', error);
    });

    // let container = document.createElement('div');
    const container = document.getElementById("container");


    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    console.log(renderer.domElement)


    document.querySelector("#place-button").addEventListener("click", function () {
        arPlace();
        render()
    });

    function arPlace() {
        if (reticle.visible) {
            model.position.setFromMatrixPosition(reticle.matrix);
            scene.add(model);
            model.visible = true;

        }
    }
    render()
    const loader = new GLTFLoader();
    loader.load("./assets/model/untitled.glb", function (gltf) {
        model = gltf.scene;
        model.scale.set(0.4, 0.4, 0.4);
        model.rotation.y = -Math.PI / 2;
        // controls.update();
        render()

    });


    // Touch events for pinch-to-zoom


    window.addEventListener('resize', onWindowResize, false);

    let initialDistance = 0;
    const minScale = 0.4;
    const maxScale = 1;
    renderer.domElement.addEventListener('select', onSelect , false)
    renderer.domElement.addEventListener('touchstart', function (e) {
        e.preventDefault();
        touchDown = true;
        touchX = e.touches[0].pageX;
        touchY = e.touches[0].pageY;

        if (e.touches.length === 2) {
            const dx = e.touches[0].pageX - e.touches[1].pageX;
            const dy = e.touches[0].pageY - e.touches[1].pageY;
            initialDistance = Math.sqrt(dx * dx + dy * dy);
        }

    }, false);

    renderer.domElement.addEventListener('touchend', function (e) {
        e.preventDefault();
        touchDown = false;
    }, false);



    renderer.domElement.addEventListener('touchmove', function (e) {
        e.preventDefault();


        if (e.touches.length === 2) {
            const dx = e.touches[0].pageX - e.touches[1].pageX;
            const dy = e.touches[0].pageY - e.touches[1].pageY;
            const currentDistance = Math.sqrt(dx * dx + dy * dy);

            // Calculate scale factor
            const scaleChange = currentDistance / initialDistance;

            // Apply the scale factor to the model's current scale
            const newScale = model.scale.x * scaleChange;

            // Clamp the new scale to prevent it from going out of bounds
            const clampedScale = Math.min(Math.max(newScale, minScale), maxScale);

            // Update the model scale uniformly
            model.scale.set(clampedScale, clampedScale, clampedScale);

            // Update initial distance for next move
            initialDistance = currentDistance;
        }

        if (!touchDown) {
            return;
        }

        deltaX = e.touches[0].pageX - touchX;
        deltaY = e.touches[0].pageY - touchY;
        touchX = e.touches[0].pageX;
        touchY = e.touches[0].pageY;

        rotateObject();

    }, false);


}

function onSelect() {
    if (reticle.visible) {
        model.position.setFromMatrixPosition(reticle.matrix);
        scene.add(model);
        model.visible = true;

    }
    render()
}


var touchDown, touchX, touchY, deltaX, deltaY;

function rotateObject() {
    if (model && reticle.visible) {
        model.rotation.y += deltaX / 100;
    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
function startARSession() {
    if (navigator.xr) {
        console.log("WebXR supported by browser");
        navigator.xr.isSessionSupported('immersive-ar').then((supported)=>{
            if (supported) {
                console.log("immersive-ar supported");
                
                if (!xrSession) {
                    
                    const options = {
                        requiredFeatures: ['hit-test', 'local-floor'],
                        optionalFeatures: ['dom-overlay'],
                        domOverlay: { root: document.getElementById('content4') }
                    };
            
                    navigator.xr.requestSession('immersive-ar', options).then((session) => {
                        xrSession = session;
                        renderer.xr.setSession(session);
            
                        onSessionStart();
            
                        // Handle session end event
                        session.addEventListener('end', onSessionEnd);
                    });
                }
                
            } else {
                console.log("Not supported");
                alert("Immersive-AR Not Supported In Your Device")
            }
        })
        console.log(hitTestSourceRequested);
        console.log(xrSession);
        console.log(hitTestSource);
        console.log(reticle);


    } else {
        alert("WebXR not supported by the browser")
    }
    
}

function endARSession() {
    if (xrSession) {
        xrSession.end().then(() => {
            hitTestSourceRequested = false;
            xrSession = null;
            hitTestSource = null;
        });
    }

    if (reticle) {
        scene.remove(reticle);
        reticle.geometry.dispose();
        reticle.material.dispose();
        reticle = null;
    }
    console.log(reticle);

}


function onSessionStart() {

    if (model) {
        model.visible = true;

    }

    // Ensure any existing reticle is removed before creating a new one
    if (reticle) {
        scene.remove(reticle);
        reticle = null;
    }

    // Create the reticle
    const reticleGeometry = new THREE.RingGeometry(0.07, 0.1, 32);
    const reticleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });
    reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.rotation.x = -Math.PI / 2; // Align the reticle to face upwards
    reticle.visible = false;
    reticle.matrixAutoUpdate = false;
    scene.add(reticle);

    hitTestSourceRequested = false;
    if (reticle.visible == false) {
        document.getElementsByClassName("placegif")[0].classList.remove("hidden")
    }
    // else {
    //     document.getElementsByClassName("placegif")[0].classList.add("hidden")
    // }
    // Add device orientation event listener (remove old listeners if they exist)
    window.removeEventListener('deviceorientation', handleDeviceOrientation);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
};

function handleDeviceOrientation(event) {
    const beta = event.beta; // Range is typically between -180 to 180 degrees

    // Show the reticle when the phone angle is between 0 and 90 degrees
    if (beta >= 30 && beta <= 60 && reticle) {
        reticle.visible = true;
    } else if (reticle) {
        reticle.visible = false;
    }

    if (reticle.visible == false) {
        document.getElementsByClassName("placegif")[0].classList.remove("hidden")
    }
    else {
        document.getElementsByClassName("placegif")[0].classList.add("hidden")
    }
}

function onSessionEnd() {
    if (model) {
        // model.visible = false;
        scene.remove(model)
    }
    if (reticle) {
        scene.remove(reticle);
        reticle.geometry.dispose();
        reticle.material.dispose();
        reticle = null;
    }

    // Clean up hit test sources
    if (hitTestSource) {
        hitTestSource.cancel();
        hitTestSource = null;
    }
    hitTestSourceRequested = false;
    xrSession = null;
    window.removeEventListener('deviceorientation', handleDeviceOrientation);

};

function animate() {

    renderer.setAnimationLoop(render);
    requestAnimationFrame(animate);
    // controls.update();


}
function render(timestamp, frame) {
    if (frame) {
        var referenceSpace = renderer.xr.getReferenceSpace();
        var session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then(function (referenceSpace) {
                session.requestHitTestSource({ space: referenceSpace }).then(function (source) {
                    hitTestSource = source;
                });
            });
            hitTestSourceRequested = true;
        }

        if (hitTestSource) {
            var hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length > 0) {
                const hit = hitTestResults[0];
                if (reticle && reticle.visible) {
                    reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
                }
            }
        }
    }

    renderer.render(scene, camera);
}

