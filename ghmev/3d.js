
import * as THREE from './node_modules/three/build/three.module.min.js';

import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from './node_modules/three/examples/jsm/loaders/EXRLoader.js';
import { VRButton } from './node_modules/three/examples/jsm/webxr/VRButton.js';
import { ARButton } from './node_modules/three/examples/jsm/webxr/ARButton.js';
import { XRButton } from './node_modules/three/examples/jsm/webxr/XRButton.js';

import { ScrollTrigger } from './node_modules/gsap/ScrollTrigger.js';


gsap.registerPlugin(ScrollTrigger);

//funtion for scene creation
function createscene(view, container, object) {

    const scene = new THREE.Scene();
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    //camera
    const camera = new THREE.PerspectiveCamera(view, container.clientWidth / container.clientHeight, 0.1, 1000);

    //Action
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.toneMapping = THREE.NoToneMapping;
    // renderer.toneMappingExposure = 0.1;

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    const controls = new OrbitControls(camera, renderer.domElement);
    console.log(renderer.domElement)





    var loader = new GLTFLoader();//gltfloader
    var obj = new THREE.Object3D();//object


    const exrLoader = new EXRLoader();
    exrLoader.load('./assets/model/hdri/studio_small_08_1k.exr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = null;
    }, undefined, (error) => {
        console.error('An error occurred loading the EXR:', error);
    });

    let group1, group2;
    const pivot = new THREE.Group();
    loader.load(object, function (gltf) {
        obj = gltf.scene;
        // obj.position.y = -0.8
        // scene.add(obj);


        const box = new THREE.Box3().setFromObject(obj);
        const centre = new THREE.Vector3();
        box.getCenter(centre);
        obj.position.sub(centre);

        pivot.add(obj);
        scene.add(pivot);
        // pivot.position.set(0, 0, 0) //ye change hua h
        // console.log(obj);




        group1 = obj.getObjectByName('wheel_front');//front part
        group2 = obj.getObjectByName('wheel_rear');//back 

        if (container == container1) {
            gsap.from(container, { duration: 1, x: window.innerWidth, ease: "linear" })
            gsap.to(group1.rotation, { duration: 1, x: Math.PI * 2 })

            // const light2=new THREE.DirectionalLight(0x006069c6,100)
            // light2.position.set(0,0,1)
            // scene.add(light2)
            gsap.to("#content5", {
                opacity: 1,
                scrollTrigger: {
                    trigger: ".play",
                    start: "-15%",
                    end: "-4%",
                    scrub: true,
                    scroller: ".main"
                }
            })








            if (window.innerWidth > 640) {

                gsap.fromTo(container, { x: window.innerWidth / 2.5 }, {
                    duration: 1,
                    x: -window.innerWidth / 5,
                    y: window.innerHeight + 180,
                    scrollTrigger: {
                        trigger: ".page1",
                        start: "0%",
                        // end: "85%",
                        // markers: true,
                        scrub: true,
                        scroller: ".main"
                    }
                })

                gsap.to(camera.position, {
                    duration: 1,
                    z: 2.7,
                    x: 0,
                    y: 0,
                    ease: "power4.in",
                    scrollTrigger: {
                        trigger: ".page1",
                        start: "0%",
                        // markers: true,
                        // end: "80%",
                        scrub: true,
                        scroller: ".main"
                    }
                })
            }
            else {

                document.getElementById("playbtn").classList.add("mobile-view-css")
                document.getElementById("playbtn").style.bottom = "23%"
                document.getElementById("immersivetxt").classList.add("mobile-view-css")
                document.getElementById("immersivetxt").style.top = "10%"
                gsap.fromTo(container, { x: 0 }, {
                    // duration: 1,

                    y: window.innerHeight / 1,
                    scrollTrigger: {
                        trigger: ".page1",
                        start: "0%",
                        // end: "80%",
                        // markers: true,
                        scrub: true,
                        scroller: ".main"
                    }
                })

                gsap.to(camera.position, {
                    duration: 1,
                    z: 3,
                    x: 0,
                    y: 0,
                    ease: "power4.in",
                    scrollTrigger: {
                        trigger: ".page1",
                        start: "0%",
                        // markers: true,
                        end: "80%",
                        scrub: true,
                        scroller: ".main"
                    }
                })
            }
            gsap.to(obj.rotation, {
                duration: 1,
                y: Math.PI * 3,
                scrollTrigger: {
                    trigger: ".page1",
                    start: "0%",
                    // markers: true,
                    scrub: true,
                    scroller: ".main"
                }
            })


        }


        if (container == container3) {

            pivot.position.set(0, 0, 0)

            controls.enabled = false;
            camera.position.set(0, 0, 2.7)
            let switchbtn = "off";
            const toggleSwitch = document.getElementById("toggleSwitch");
            toggleSwitch.addEventListener('click', () => {
                if (switchbtn == "off") {
                    switchbtn = "on";
                    toggleSwitch.classList.remove("justify-start");
                    toggleSwitch.classList.add("justify-end");
                    let electric = document.getElementsByClassName("electric")[0];
                    let tl = gsap.timeline()
                    tl.to(".electric", { opacity: 0.5, duration: 0.4 })
                    tl.to(".electric", { opacity: 0, duration: 0.5, delay: 0.2 })

                    controls.enabled = true;
                    controls.enableDamping = true; // Smooth motion
                    controls.dampingFactor = 0.25;
                    controls.rotateSpeed = 0.45;
                    controls.enableZoom = true; // Disable zoom functionality
                    controls.enablePan = false;
                    controls.maxPolarAngle = 1.5;
                    controls.minPolarAngle = 1;
                    controls.maxDistance = 5;
                    controls.minDistance = 1;

                    //cursor action
                    renderer.domElement.classList.add('cursor-grab');

                    controls.addEventListener('start', () => {
                        renderer.domElement.classList.remove('cursor-grab');
                        renderer.domElement.classList.add('cursor-grabbing');
                    });

                    controls.addEventListener('end', () => {
                        renderer.domElement.classList.remove('cursor-grabbing');
                        renderer.domElement.classList.add('cursor-grab');
                    });




                    function onMouseLeave() {

                        gsap.to(pivot.rotation, { duration: 1, x: 0, y: -Math.PI / 2, z: 0 })

                        // Bring camera and control to initial position
                        gsap.to(camera.position, { duration: 0.1, x: 0, y: 0, z: 2.7, ease: 'power3.out' });
                        gsap.to(controls.target, {
                            duration: 0.5, x: 0, y: 0, z: 0, ease: 'power2.out',
                            onUpdate: () => {
                                controls.update(); // Update controls during animation
                            }
                        });


                    }

                    container.addEventListener('mouseleave', onMouseLeave);
                    // renderer.domElement.style.zIndex = 11;
                    // renderer.domElement.style.position = "fixed";
                    document.getElementById('De').style.display = "none"

                } else {
                    switchbtn = "off";
                    controls.enabled = false;
                    document.getElementById('De').style.display = "inline"
                    toggleSwitch.classList.remove("justify-end")
                    toggleSwitch.classList.add("justify-start")
                    renderer.domElement.classList.remove('cursor-grabbing');
                    renderer.domElement.classList.remove('cursor-grab');

                    gsap.to(pivot.rotation, { duration: 1, x: 0, y: -Math.PI / 2, z: 0 })

                    // Bring camera and control to initial position
                    gsap.to(camera.position, { duration: 0.1, x: 0, y: 0, z: 2.7, ease: 'power3.out' });
                    gsap.to(controls.target, {
                        duration: 0.5, x: 0, y: 0, z: 0, ease: 'power2.out',
                        onUpdate: () => {
                            controls.update(); // Update controls during animation
                        }
                    });
                }

            })


            // if (switchbtn == "on") {

            // }
            // else {

            // }
            const end = document.getElementById("end360")
            end.addEventListener('click', () => {
                controls.enabled = false;
                switchbtn = "off"
                toggleSwitch.classList.remove("justify-end")
                toggleSwitch.classList.add("justify-start")
                document.getElementById('De').style.display = "inline"
                renderer.domElement.classList.remove('cursor-grab');
                renderer.domElement.classList.remove('cursor-grabbing');
            })
        }




        if (container == container2) {
            // controls.enabled = false;
            camera.position.set(0, 0, 3)
            pivot.rotation.y = Math.PI / 2;
            gsap.fromTo(container, { x: -window.innerWidth / 1.3 }, {
                duration: 1,
                x: -window.innerWidth / 4,
                // y: window.innerHeight + 180,
                scrollTrigger: {
                    trigger: ".part2",
                    start: "-15%",
                    scroller: ".main"
                }
            })
            gsap.to(group1.rotation, {
                duration: 1, x: Math.PI * 2,
                scrollTrigger: {
                    trigger: ".part2",
                    start: "-10%",
                    scroller: ".main"
                }
            })
            gsap.to(group2.rotation, {
                duration: 1, x: Math.PI * 2,
                scrollTrigger: {
                    trigger: ".part2",
                    start: "-10%",
                    scroller: ".main"
                }
            })
            document.querySelectorAll(".heading").forEach(function (button) {

                let newid = 0;
                button.addEventListener("click", (e) => {


                    const btnid = e.target.id;
                    if (btnid > 10) {
                        newid = btnid;
                        const plus = document.getElementById(newid);
                        document.getElementById(newid - 10).classList.add("z-10");


                        gsap.to(`.headcolor${btnid - 10}`, {
                            width: "0%",

                            duration: 0.3,
                            ease: "power1.Out",
                        });
                        gsap.to(`.headcolor${btnid - 10}`, {
                            backgroundColor: "#94a3b8",
                            duration: 0.4,
                            ease: "power1.Out",
                        });
                        gsap.to(plus, { rotate: 0, duration: 0.4, ease: "power1.Out", });

                        gsap.to(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                        document.getElementsByClassName("featurecontent")[newid - 11].classList.add("hidden");
                        console.log("close");
                        console.log(newid);
                        document.getElementsByClassName(`btn-headcolor${btnid - 10}`)[0].classList.remove("active");
                        document.querySelector(`.btn-headcolor${btnid - 10} .absolute`).classList.remove("pointer-events-none")
                        document.querySelector(`.btn-headcolor${btnid - 10} .absolute`).classList.add("cursor-pointer")
                    }
                })
            })
            document.getElementById("1").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })
                gsap.to(camera.position, {
                    z: 1.1,
                    x: -0.9,
                    y: -0.1
                });
                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("2").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })
                gsap.to(camera.position, {
                    z: 0.9,
                    x: 0.37,
                    y: 0.5
                });
                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("3").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.3, x: 0.47, y: -0.3 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("4").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: 0.67, y: 0 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("5").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: 0.3, y: 0.67 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("6").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: 0.3, y: 0.7 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("7").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: -1, y: 0 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("8").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.57, x: -0.7, y: 0.7 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("9").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: -0.1, y: 0.5 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
            document.getElementById("10").addEventListener('click', () => {
                gsap.from(camera.position, { z: 3, x: 0, y: 0, ease: "power1.in" })

                gsap.to(camera.position, { z: 0.8, x: 0.3, y: 0.7 });

                document.querySelector("#model canvas").classList.add("rounded-full");
            })
        }

    });
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true; // Smooth motion
    // controls.dampingFactor = 0.25;
    // controls.rotateSpeed = 0.35;
    // // controls.enableZoom = false; // Disable zoom functionality
    // // controls.enablePan = false;
    // controls.maxPolarAngle = 1.5;
    // controls.minPolarAngle = 1;


    // const mouse = new THREE.Vector2();

    // let previousMouseX = 0;
    // let previousMouseY = 0;
    // function onMouseMove(event) {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


    //     const moveX = mouse.x - previousMouseX;
    //     const moveY = mouse.y - previousMouseY;
    //     pivot.rotation.y += moveX * 0.2;
    //     pivot.rotation.x += moveY * 0.08;
    //     previousMouseX = mouse.x;
    //     previousMouseY = mouse.y;
    // }


    // function onMouseLeave() {

    //     gsap.to(pivot.rotation, { duration: 1, x: 0, y: 0, })

    //     // Bring camera and control to initial position
    //     gsap.to(camera.position, { duration: 0.1, x: 0, y: 0, z: 5, ease: 'power3.out' });
    //     gsap.to(controls.target, {
    //         duration: 0.5, x: 0, y: 0, z: 0, ease: 'power2.out',
    //         onUpdate: () => {
    //             controls.update(); // Update controls during animation
    //         }
    //     });


    // }

    // container.addEventListener('mousemove', onMouseMove);
    // container.addEventListener('mouseleave', onMouseLeave);

    camera.position.set(0, 0, 1.7);
    pivot.rotation.y = -Math.PI / 2;

    //object render
    function animate() {
        requestAnimationFrame(animate);
        // console.log(obj);
        // controls.update();
        renderer.render(scene, camera);
    }
    animate();

}
const container1 = document.getElementById("model1")
const container2 = document.getElementById("model")
const container3 = document.getElementById("model2")
const playbtn = document.getElementById("playbtn")
if (window.innerWidth <= 425) {
    createscene(125, container1, "./assets/model/untitled.glb")
    createscene(125, container2, "./assets/model/untitled.glb")
    playbtn.addEventListener('click', () => {
        document.getElementById('playground').classList.remove("hidden")
        createscene(125, container3, "./assets/model/untitled.glb")
    })
}
else if (window.innerWidth >= 425 && window.innerWidth <= 768) {
    createscene(100, container1, "./assets/model/untitled.glb")
    createscene(100, container2, "./assets/model/untitled.glb")
    playbtn.addEventListener('click', () => {
        document.getElementById('playground').classList.remove("hidden")
        createscene(100, container3, "./assets/model/untitled.glb")
    })
}
else {
    if (window.innerHeight > 1000) {
        createscene(110, container1, "./assets/model/untitled.glb")
        createscene(105, container2, "./assets/model/untitled.glb")

        playbtn.addEventListener('click', () => {
            document.getElementById('playground').classList.remove("hidden")
            createscene(105, container3, "./assets/model/untitled.glb")
        })
    }
    else{

        createscene(75, container1, "./assets/model/untitled.glb")
        createscene(75, container2, "./assets/model/untitled.glb")
    
        playbtn.addEventListener('click', () => {
            document.getElementById('playground').classList.remove("hidden")
            createscene(75, container3, "./assets/model/untitled.glb")
        })
    }
}