//------------------nav bar animation on scroll-----------------//
const navBar = document.getElementsByTagName("nav")[0];

function navBarTransition(e) {
    let deltaY = e[0].boundingClientRect.y - e[0].rootBounds.height;

    if (deltaY > 0) {
        navBar.style.gridTemplateRows = "97px 150px";
        navBar.className = "headerFull";
    } else {
        navBar.style.gridTemplateRows = "73px 150px";
        navBar.className = "headerAfter";
    }
}

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

let observer = new IntersectionObserver(navBarTransition, options);
let target = document.querySelector(".lessons");
observer.observe(target);

//--------menu toggle---------------------------//
const burgerCheckBox = document.getElementById("toggle");
const menu = document.getElementsByClassName("side-menu")[0];
const mediaCheck = window.matchMedia("screen and (min-width: 743px)");

function menuToggle() {
    if (!burgerCheckBox.checked) {
        menu.id = "hidden";
    } else if (burgerCheckBox.checked) {
        menu.removeAttribute("id", "hidden");
    }
}

function menuReset() {
    if (mediaCheck.matches) {
        menu.id = "hidden";
        burgerCheckBox.checked = false;
    }
}

burgerCheckBox.addEventListener("change", menuToggle);
mediaCheck.addListener(menuReset);


//-------------about-me section reformat----------//
/*const aboutMeContent = document.querySelector(".about-me .section-content");
const aboutMeMediaCheckLarge = window.matchMedia("screen and (min-width: 743px)");
const aboutMeMediaCheckSmall = window.matchMedia("screen and (max-width: 742px");

function removeMobileFormat() {
    if (aboutMeMediaCheckLarge.matches) {
        aboutMeContent.removeAttribute("id", "about-me-content");
    }
}

function setMobileFormat() {
    if (aboutMeMediaCheckSmall.matches) {
        aboutMeContent.setAttribute("id", "about-me-content");
    }
}

aboutMeMediaCheckLarge.addListener(removeMobileFormat);
aboutMeMediaCheckSmall.addListener(setMobileFormat);*/


//---------contact form submit------------//
const contactForm = document.querySelector(".contact-form");
const submitMessage = document.querySelector(".submit-message");
const failMessage = document.querySelector(".fail-message");

function formSubmission(e) {
    e.preventDefault();
    contactForm.setAttribute("class", "hidden");
    //loading animation initiate
    const formData = new FormData(this);

    fetch('/', {
        method: 'post',
        body: formData
    })
        .then(response => {
            return (response.json());
        })
        .then(object => {
            if (object["success"]) {
                submitMessage.removeAttribute("class", "hidden");
            }
            else if (!object["success"]) {
                failMessage.removeAttribute("class", "hidden");
            }
        })
}

contactForm.addEventListener("submit", formSubmission);
