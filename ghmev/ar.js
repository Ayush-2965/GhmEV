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


// End AR session on button click
// const endSessionButton = document.getElementById("exit");
// endSessionButton.textContent = 'End AR Session';
// // document.body.appendChild(endSessionButton);

// endSessionButton.addEventListener('click', () => {
//     if (renderer.xr.isPresenting) {
//         renderer.xr.getSession().end(); // End the AR session
        
//     }
// });


document.getElementById('start').addEventListener('click', startARSession);
document.getElementById('exit').addEventListener('click', endARSession);


function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 200);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const exrloader= new EXRLoader();
    exrloader.load('./assets/model/hdri/studio_small_08_1k.exr',(texture)=>{
        texture.mapping=THREE.EquirectangularReflectionMapping;
        scene.enviroment=texture;
        scene.background=null;
    })

    // let container = document.createElement('div');
    const container =document.getElementById("container");


    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    console.log(renderer.domElement)

    

    // const options = {
    //     requiredFeatures: ['hit-test'],
    //     optionalFeatures: ['dom-overlay'],

    // };
    // options.domOverlay = { root: document.getElementById('content4') }
    // document.body.appendChild(ARButton.createButton(renderer, options));


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
    
    // const reticleGeometry = new THREE.RingGeometry(0.05, 0.1, 32);
    // const reticleMaterial = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    // });
    // reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    // reticle.rotation.x = -Math.PI / 2; // Align the reticle to face upwards
    // reticle.visible = false;
    // reticle.matrixAutoUpdate = false;
    // scene.add(reticle);
    // console.log("loaded reticle");

    
    

    

    // Touch events for pinch-to-zoom


    window.addEventListener('resize', onWindowResize, false);
    
    let initialDistance = 0;
    const minScale = 0.4;
    const maxScale = 1;

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

    // Handle AR mode zoom control
    // renderer.xr.addEventListener('sessionstart', onSessionStart);
    // renderer.xr.addEventListener('sessionend', onSessionEnd);

}

// function onSelect() {
//     if (model) {
//         model.position.setFromMatrixPosition(reticle.matrixWorld);
//         scene.add(model);
//         model.visible = true;
//     }
// }











// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }



// function onMouseWheel(event) {
//     if (renderer.xr.isPresenting) {
//         // Adjust camera FOV for zoom effect in AR mode
//         const zoomSpeed = 0.05;
//         camera.fov += event.deltaY * zoomSpeed; // Adjust FOV based on mouse wheel
//         camera.fov = THREE.MathUtils.clamp(camera.fov, 30, 100); // Limit FOV values
//         camera.updateProjectionMatrix(); // Update projection matrix to apply new FOV
//     }
// }

// function animate() {
//     // requestAnimationFrame(animate);
//     if (reticle) {
//         reticle.position.set(0, -0.3, -1.5).applyMatrix4(camera.matrixWorld);
//         // reticle.quaternion.setFromRotationMatrix( controller.matrixWorld );
//     }

//     controls.update();
//     renderer.render(scene, camera);
// }
// // animate();

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
    console.log(hitTestSourceRequested);
    console.log(xrSession);
    console.log(hitTestSource);
    console.log(reticle);
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
    // renderer.xr.enabled=true;
    // var session = renderer.xr.setSession();
    

    if (model) {
        model.visible = true;
        
    }
   
    // Ensure any existing reticle is removed before creating a new one
    if (reticle) {
        scene.remove(reticle);
        reticle = null;
    }

    // Create the reticle
    const reticleGeometry = new THREE.RingGeometry(0.05, 0.1, 32);
    const reticleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });
    reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.rotation.x = -Math.PI / 2; // Align the reticle to face upwards
    reticle.visible = false;
    reticle.matrixAutoUpdate = false;
    scene.add(reticle);

    hitTestSourceRequested = false;

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

