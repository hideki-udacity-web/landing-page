/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function fetchSections(){
    console.log('fetch sections');
    return document.querySelectorAll('section');
}

function createNavList(){
    const fragment = document.createDocumentFragment();
    const sections = fetchSections();

    for(const section of sections){
        const list = document.createElement('li');
        list.className = 'menu__link'
        list.insertAdjacentHTML('afterbegin', `<a href=#${section.id}>${section.dataset.nav}</a>`);
        fragment.appendChild(list);
        console.log(`create link ${section.dataset.nav}`);
    }

    navBarList.appendChild(fragment);
    console.log('createNavList');
}

function checkCurrentPositionTop(section){
    console.log('check');
    const top = section.getBoundingClientRect().top;
    console.log(`${section.id}, ${top}`);
    if(top > 0 & top <= 500){
        return true;
    }else{
        return false;
    }
}

function removeActiveSectionClass(section){
    if(!checkCurrentPositionTop(section)){
        section.classList.remove('your-active-class');
        console.log('remove active class');
    }else{
        return;
    }
}

function addActiveSectionClass(){
    const sections = fetchSections();
            for(const section of sections){
                if(checkCurrentPositionTop(section)){
                    section.classList.add('your-active-class');
                    console.log(`${section.id} is active`);
                    return;
                }
            }
}


 function activeSectionClass(){
        console.log("scrolled");
        const currentActiveSection = document.querySelector('.your-active-class');
        console.log(currentActiveSection);
            if(currentActiveSection !== null){
                if(checkCurrentPositionTop(currentActiveSection)){
                    return;
                }else{
                    currentActiveSection.classList.remove('your-active-class');
                    console.log('remove active class');
                }
            }else{
                addActiveSectionClass();
            }
     }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createNavList();

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', activeSectionClass);

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active