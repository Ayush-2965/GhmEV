

const wordDiv = document.getElementById("topline");

let wordText = wordDiv.textContent;



wordDiv.innerHTML = ""; // Clear existing content



for (let char of wordText) {

  let span = document.createElement("span");

  span.textContent = char;

  wordDiv.appendChild(span);

}



function scrollgsap() {
    // const scroll = new LocomotiveScroll({
    //   el: document.querySelector('.main'),
    //   smooth: true
    // });

    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: 2,
        smartphone: {
            smooth: 0.3,
            breakpoint: 1024,
        },
        tablet: {
            smooth: 1,
            breakpoint: 1440,
        },
    });

    const element = document.getElementById("ebikes");
    document.getElementById("bike").addEventListener('click', () => {
        // locoScroll.destroy();
        locoScroll.scrollTo(element);
        
        // locoScroll.init();
        // locoScroll.start();
        // locoScroll.update();
    })
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector(".main").style.transform
            ? "transform"
            : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

scrollgsap();

let card = document.getElementsByClassName("card");
let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let tl = gsap.timeline({});
// Example of adding a log statement in GLTFLoader.js
function loadAccessor(accessorIndex) {
    const accessorDef = json.accessors[accessorIndex];
    const bufferView = bufferViews[accessorDef.bufferView];

    console.log("Accessor:", accessorDef);
    console.log("BufferView:", bufferView);

    // Existing code to load the accessor...
}

gsap.to(".nav", {
    backgroundColor: "#191e1e",

    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        // markers: true,
        scroller: ".main",
    },
});
gsap.to(".nav svg", {
    fill: "white",

    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        scroller: ".main",
    },
});
gsap.to(".nav .righticon", {
    color: "white",

    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        scroller: ".main",
    },
});
gsap.to(".nav .profileicon", {
    outline: "2px solid white",

    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        scroller: ".main",
    },
});
gsap.to(".capsule", {
    backgroundColor: "transparent",
    color: "white",
    // outline:"0.5px solid black",
    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        scroller: ".main",
        // pin:true
    },
});
gsap.to(".capsule i", {
    // backgroundColor: "transparent",
    color: "white",
    // outline:"0.5px solid black",
    scrollTrigger: {
        trigger: "body",

        start: "15% 14%",
        end: "15% 14%",
        scrub: true,
        scroller: ".main",
        // pin:true
    },
});
gsap.from(".page3", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".page3",

        start: "top 60%",
        end: "top 25%",
        scrub: 2,
        scroller: ".main",
    },
});

gsap.from(".part2 .features", {
    opacity: 0,
    duration:3,
    ease:"power3.inOut",
    scrollTrigger: {
        trigger: "#part2",
        start: "top 50%",
        end: "top 50%",
        // markers:true,
        scroller: ".main",
        // pin:true
    },
});

if (window.innerWidth > 425) {

    gsap.from(".card1", {
        opacity: 0,
        scale: 0.5,
        // duration:5,
        scrollTrigger: {
            trigger: ".page2",

            start: "top 50%",
            end: "top 0%",
            scrub: 1,
            scroller: ".main",
            // pin:true
        },
    });
    gsap.from(".card1 .img1", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 50%",
            end: "top 0%",
            scroller: ".main",
            scrub: 2,
        },
    });

    gsap.from(".card2", {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 35%",
            end: "top 1%",

            scrub: 1,
            scroller: ".main",
            // pin:true
        },
    });
    gsap.from(".card2 .img2", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 35%",
            end: "top 1%",

            scrub: 2,
            scroller: ".main",
            // pin:true
        },
    });
    gsap.from(".card3", {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 35%",
            end: "top 0%",
            scroller: ".main",
            scrub: 1,
        },
    });
    gsap.from(".card3 .img3", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 35%",
            end: "top 0%",
            scroller: ".main",
            scrub: 2,
        },
    });
    gsap.from(".card4", {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 1,
        },
    });
    gsap.from(".card4 .img4", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 2,
        },
    });
}
else {
    const tlcard = gsap.timeline({});
    tlcard.from(".card1", {
        opacity: 0,
        scale: 0.5,
        // duration:5,
        scrollTrigger: {
            trigger: ".page2",

            start: "top 50%",
            end: "top 21%",
            scrub: 1,
            scroller: ".main",
            // pin:true
        },
    });
    tlcard.from(".card1 .img1", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 50%",
            end: "top 21%",
            scroller: ".main",
            scrub: 2,
        },
    });

    tlcard.from(".card2", {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: ".page2",

            start: "top 50%",
            end: "top 21%",
            scrub: 1,
            scroller: ".main",
            // pin:true
        },
    }, 0);
    tlcard.from(".card2 .img2", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 50%",
            end: "top 21%",
            scroller: ".main",
            scrub: 2,
        },
    }, 0);

    tlcard.from(".card3", {
        opacity: 0,
        scale: 0.5,
        // duration:5,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 1,
        },
    });
    tlcard.from(".card3 .img3", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 2,
        },
    });

    tlcard.from(".card4", {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 1,
        },
    }, 0);
    tlcard.from(".card4 .img4", {
        x: -250,
        scrollTrigger: {
            trigger: ".page2",
            start: "top 21%",
            end: "top 0%",
            scroller: ".main",
            scrub: 2,
        },
    }, 0);

}

tl.to(".toptext", {
    y: 70,
    scale: 1.5,
    opacity: 1,

    scrollTrigger: {
        trigger: ".page2",
        start: "top 80%",
        end: "top 0%",
        scrub: 1,
        scroller: ".main",
    },
});

//card image floating animation on hover

var currentAnimation;

document.querySelectorAll(".overlay").forEach(function (card) {
    card.addEventListener("mouseenter", function (e) {
        if (currentAnimation) {
            currentAnimation.kill(); // Stop any existing animation
        }
        let cardindex = parseInt(e.target.id);
        console.log(cardindex)
        let cardhover = `.card${cardindex % 4}`;
        currentAnimation = gsap.to(`${cardhover} .img`, {
            duration: 1.7,
            y: -20,
            ease: Power1.easeInOut,
            repeat: -1,
            yoyo: true,
        }); // Move up along the y-axis
    });

    card.addEventListener("mouseleave", function (e) {
        if (currentAnimation) {
            currentAnimation.kill(); // Stop the animation on mouse leave
        }
        let cardindex = parseInt(e.target.id);
        //  console.log(cardindex)
        let cardhover = `.card${cardindex % 4}`;
        gsap.to(`${cardhover} .img`, { duration: 0.5, y: 0 }); // Reset position along the y-axis
    });
});

//feature section

let boxColor = function () {
    document.querySelectorAll(".box").forEach((element) => {
        element.style.cssText = "background-color:white;color:black";
    });
};
let hide = function () {
    document.querySelectorAll(".heading").forEach(function (e) {
        e.setAttribute("style", "display:none");
    });
};
box1.addEventListener("click", function () {
    boxColor();
    box1.style.cssText = "background-color:black;color:white";

    hide();
    for (let i = 1; i < 5; i++) {
        document
            .querySelector(`.btn-headcolor${i}`)
            .setAttribute("style", "display:flex");
    }
});
box2.addEventListener("click", function () {
    boxColor();
    box2.style.cssText = "background-color:black;color:white";

    hide();
    for (let i = 5; i < 8; i++) {
        document
            .querySelector(`.btn-headcolor${i}`)
            .setAttribute("style", "display:flex");
    }
});
box3.addEventListener("click", function () {
    boxColor();
    box3.style.cssText = "background-color:black;color:white";

    hide();
    for (let i = 8; i < 11; i++) {
        document
            .querySelector(`.btn-headcolor${i}`)
            .setAttribute("style", "display:flex");
    }
});

//review card and autoplay

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstcardwidth = document.querySelector(".reviewcard").offsetWidth;
const carouselChildrens = [...carousel.children];

let isdragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;
const dragstart = (e) => {
    isdragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const gridItems = document.querySelectorAll(".carousel");

// scale animation with transform origin set to center

let play = () => {
    gsap.from(".carousel .reviewcard", {
        // x:10,
        scale: 0.999,
        opacity: 0,
        transformOrigin: "center center",
        duration: 1.5,
    });
    gridItems.forEach((item) => {
        gsap.fromTo(
            item,
            { scale: 0.95, opacity: 0, transformOrigin: "center center" },
            { scale: 1, opacity: 1, duration: 1.5 }
        );
    });
};

let cardPerView = Math.round(carousel.offsetWidth / firstcardwidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.classList.remove("no-transition");

const dragging = (e) => {
    if (!isdragging) {
        return;
    }

    if (startX >= e.pageX) {
        carousel.scrollLeft = startScrollLeft + firstcardwidth;
    } else {
        carousel.scrollLeft = startScrollLeft - firstcardwidth;
    }

    console.log(carousel.scrollLeft);
};

const dragstop = () => {
    isdragging = false;
    carousel.classList.remove("dragging");
};

console.log(carousel.scrollWidth);
console.log(carousel.offsetWidth);
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;

        carousel.classList.remove("no-transition");
        console.log("end");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
    ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;

        carousel.classList.remove("no-transition");
        console.log("starend");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
    if (window.innerWidth < 300 || !isAutoPlay) return;

    // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => {
        play();
        carousel.scrollLeft += firstcardwidth;
    }, 2500);
};
autoPlay();

console.log(carousel.scrollLeft);
carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// model features animation
let activeid = 0;
document.querySelectorAll(".heading").forEach(function (button) {


    button.addEventListener("mouseover", (e) => {

        if (button.classList.contains("active")) {
            console.log("active");
            button.style.color = "black";
        }
        else {
            let i;
            for (i = 1; i <= 10; i++) {
                if (i != activeid) {

                    if (window.innerWidth > 425) {

                        button.style.color = "white";
                    }
                    gsap.to(`.headcolor${i}`, {
                        width: "0%",

                        duration: 0.4,
                        ease: "power1.Out",
                    });
                }

            }

            // console.log(e.target.id)
            const btn = button.classList[0].split("-")[1];
            gsap.to(`.${btn}`, {
                width: "100%",

                duration: 0.4,
                ease: "power2.in",
            });
        }


    });



    button.addEventListener("mouseleave", () => {
        for (let i = 1; i <= 10; i++) {
            if (i != activeid) {
                button.style.color = "black";
                gsap.to(`.headcolor${i}`, {
                    width: "0%",
                    duration: 0.4,
                    ease: "power1.Out",
                });
            }

        }
    });
    let newid = 0, oid = 0;
    button.addEventListener("click", (e) => {
        console.log(button);
        console.log(e);
        document.querySelectorAll(".heading").forEach((all) => {
            all.classList.remove("active");
        });

        button.classList.add("active")

        const id = e.target.id;
        if (id > 0 && id <= 10) {
            oid = id;
            activeid = id;

            for (let i = 1; i <= 10; i++) {
                if (i != activeid) {

                    gsap.to(`.headcolor${i}`, {
                        width: "0%",

                        duration: 0.3,
                        ease: "power1.Out",
                    });
                    gsap.to(`.headcolor${i}`, {
                        backgroundColor: "#94a3b8",
                        duration: 0.4,
                        ease: "power1.Out",
                    });//cursor-pointer
                    document.querySelector(`.btn-headcolor${i} .absolute`).classList.remove("pointer-events-none")
                    document.querySelector(`.btn-headcolor${i} .absolute`).classList.add("cursor-pointer")
                }
                else {
                    document.querySelector(`.btn-headcolor${i} .absolute`).classList.add("pointer-events-none")
                    document.querySelector(`.btn-headcolor${i} .absolute`).classList.remove("cursor-pointer")
                    button.style.color = "gray";
                    gsap.to(`.headcolor${i}`, {
                        backgroundColor: "#71a4f780",
                        duration: 0.1,
                        ease: "power1.Out",
                    });
                }

            }


            const plusicon = document.getElementsByClassName("ri-add-line")[oid - 1];
            document.getElementById(id).classList.remove("z-10");

            gsap.to(".ri-add-line", {
                rotate: 0,
                duration: 0.4,
                ease: "power1.Out",
            });
            gsap.to(plusicon, {
                rotate: 45,
                duration: 0.4,
                ease: "power1.Out",
            });
            console.log("open");
            console.log(oid);

            document.querySelectorAll(".featurecontent").forEach((all) => {
                all.classList.add("hidden");
            });

            document.getElementsByClassName("featurecontent")[oid - 1].classList.remove("hidden");
        }
        else if (id > 10) {
            activeid = 0;
        }
    });
});

document.querySelectorAll(".box").forEach(function (boxbtn) {
    boxbtn.addEventListener('click', () => {
        document.querySelectorAll(".heading").forEach((all) => {
            all.classList.remove("active");
        });

        document.querySelectorAll(".featurecontent").forEach((all) => {
            all.classList.add("hidden");
        });

        gsap.to(`.headcolor`, {
            width: "0%",
            backgroundColor: "#94a3b8",
            duration: 0.3,
            ease: "power1.Out",
        });

        gsap.to(".ri-add-line", {
            rotate: 0,
            duration: 0.4,
            ease: "power1.Out",
        });

        for (let i = 1; i <= 10; i++) {
            document.querySelector(`.btn-headcolor${i} .absolute`).classList.remove("pointer-events-none")
            document.querySelector(`.btn-headcolor${i} .absolute`).classList.add("cursor-pointer")
        }
        // document.querySelectorAll(".btn-headcolor .absolute").forEach((all) => {
        //     all.classList.remove("pointer-events-none");
        //     all.classList.add("cursor-pointer")
        // });

    })
})

gsap.from("#topline span",{
    opacity:0,
    y:-900,
    stagger:0.1,
    ease:"power3.inOut",
    scrollTrigger: {
        trigger: ".part3",
        start: "-20%",
        end:"0%",
        scrub:2,
        markers:true,
        scroller: ".main",
        
    },
})
// const reviewanimation=()=>{
// tlreview=new TimelineMax({ repeat: -1 })
// .to(".autoplay5",{
//     opacity:1,
//     x:5,

//     duration:1
// })

// .from(".autoplay5",{
//     opacity:1,
//     x:5,
//     scale:0.95,
//     delay:2,
//     duration:1.5
// })
// .to(".autoplay4",{
//     opacity:0,
//     x:5,
//     scale:1.05,
//     delay:2,
//     duration:1.5
// })
// .from(".autoplay3",{
//     opacity:0,
//     x:5,
//     scale:1.05,
//     delay:2,
//     duration:1.5
// })
// .to(".autoplay2",{
//     opacity:0,
//     x:5,
//     scale:1.05,
//     delay:2,
//     duration:1.5
// })
// .to(".autoplay1",{
//     opacity:0,
//     x:5,
//     scale:1.05,
//     delay:2,
//     duration:1.5
// })
// }
