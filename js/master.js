// check local storage for color
let maincolor = localStorage.getItem("color_option");

if (maincolor !== null) {
    document.documentElement.style.setProperty('--main-color', maincolor);

     // remove class active from all color list item
     document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        // add class active on element with data-color === localSorage item
        if (element.dataset.color === maincolor) {

            element.classList.add("active");
        }
    });

}

// random background option
let backgroundOption = true;

// variable to control the inertval
let backgroundInterval;

// local storage for random background option
let localStorOpt = localStorage.getItem("background-option");

// check if local storage is empty
if (localStorOpt !== null) {
    
    //remove class active from spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });

    if (localStorOpt === 'true') {

        backgroundOption = true;

        document.querySelector(".random-background .yes").classList.add("active");

    } else {

        backgroundOption = false;

        document.querySelector(".random-background .no").classList.add("active");
        
    }

}

// toggle spin class on gear
document.querySelector(".setting .fa-gear").onclick = function () {
    //toggle class fa-spin to rotate the gear
    this.classList.toggle("fa-spin");

    //toggle class open on setting box
    document.querySelector(".setting-box").classList.toggle("open");
};

//switch color
const colorlist = document.querySelectorAll(".color-list li");

//loop on all of li items
colorlist.forEach(li => {
    
    //click on every li items
    li.addEventListener("click", (l) => {
        document.documentElement.style.setProperty('--main-color', l.target.dataset.color);

        // set local sotrage
        localStorage.setItem("color_option", l.target.dataset.color);

        handleActive(l);
    });
});

//switch random background image
const randomBgEl = document.querySelectorAll(".random-background span");
console.log(randomBgEl);
//loop on all of span items
randomBgEl.forEach( span => {
    
    //click on every li items
    span.addEventListener("click", (l) => {

        handleActive(l);

        if (l.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);

        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});

//select landing element to shuffle background image 
let landelem = document.querySelector(".landing");

// get imgs by array
let imgsarray = ["anonymous-vector-art.jpg" , "jubter.jpg" , "kimetsu father.jpeg" 
, "lastday.jpg" , "thumb-1920.jpg"];



function randomizeImgs() {
    
    if (backgroundOption == true) {
        // shuffle background image every 5sec
        backgroundInterval = setInterval( () => {

        //get random NO
        let randNo = Math.floor(Math.random() * imgsarray.length);

        //change bc img url
        landelem.style.backgroundImage = 'url("image/' + imgsarray[randNo] + '")';
        }, 5000);
    };
};

randomizeImgs();


//SELECT skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // skills offset top
    let ourSkillOffsettop = ourSkills.offsetTop;

    // skills offset height
    let skilsHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = window.innerHeight;

    //widow scroll top
    let widowTop = this.pageYOffset;

    // reach skills section
    if (widowTop > (ourSkillOffsettop + skilsHeight - windowHeight)) {

        let allBars = document.querySelectorAll(".skill-box .skill-prog span");

        allBars.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        
        });

    }
}

// create popup box with image
 const Gallary = document.querySelectorAll(".gallary img");

 Gallary.forEach(img => {
    img.addEventListener("click", (e) => {

        // create overlay layer
        let overlay = document.createElement("div");

        // add class to the overlay
        overlay.className = "overlay-box";

        //add overlay to the body
        document.body.appendChild(overlay);

        // remove overlay when click on it
        overlay.addEventListener("click", (e) =>{
            overlay.style.setProperty('display', 'none');
            popup.style.setProperty('display', 'none');
        });

        //creat popup box
        let popup = document.createElement("div");

        // add class to popup box
        popup.className = "popup-box";
        
        // create the popup img
        let image = document.createElement("img");

        // add img src 
        image.src = img.src

        // add image to popup box
        popup.appendChild(image);

        // add popup box to the body 
        document.body.appendChild(popup);
    });
 });

 // select all bullets 
 let allBullet = document.querySelectorAll(".nav-bullet .bullet");

 // select all bullets 
 let allLinks = document.querySelectorAll(".header ul li a");

 // active handling function

 function handleActive(evnt) {
    // remove class active from all li
    evnt.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add class active to the selected
    evnt.target.classList.add("active");
 }

 // loop into elements by function
function scrollto(element) {

    element.forEach(elem => {

        elem.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });
        });
     });
}

scrollto(allBullet);
scrollto(allLinks);

// bullets appear select
let bulletSpan = document.querySelectorAll(".bullet-appear span");

// bullet nav select 
let bulletNav = document.querySelector(".nav-bullet");

// bullets local storage
let bulletLocal = localStorage.getItem("bullet-option");

// check bullet local storage
if(bulletLocal !== null) {

    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocal === 'block') {

        bulletNav.style.display = 'block';

        document.querySelector(".bullet-appear .yes").classList.add("active");

    } else {

        bulletNav.style.display = 'none';

        document.querySelector(".bullet-appear .no").classList.add("active");
        }
    
}

// loop at bullet span
bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        if(span.dataset.appear === 'yes') {
    
            bulletNav.style.display = 'block';

            localStorage.setItem("bullet-option", 'block');
        
        } else {
    
            bulletNav.style.display = 'none';
            
            localStorage.setItem("bullet-option", 'none');
    
        }

        handleActive(e);
        
    });
});

document.querySelector(".reset-option").onclick = function () {

    // localStorage.clear();

    localStorage.removeItem("color_option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullet-option");

    // refresh the page
    window.location.reload();

};

// toggle bar clicking
let toggleBar = document.querySelector(".toggle-bar");

let navLinks  = document.querySelector(".header ul");

toggleBar.addEventListener("click", (e) => {

    navLinks.classList.add("open");
    e.stopPropagation();

});

navLinks.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {

    if(e.target !== toggleBar && e.target !== navLinks) {

        if(navLinks.classList.contains("open")) {

            navLinks.classList.remove("open");
            
        }
        
    }
    
});