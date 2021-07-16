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
const sections = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createNavList(){
    const fragment = document.createDocumentFragment();

    for(const section of sections){
        const list = document.createElement('li');
        list.insertAdjacentHTML('afterbegin', `<a href=#${section.id} class="menu__link">${section.dataset.nav}</a>`);
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
    if(top >= 0 & top <= 500){
        return true;
    }else{
        return false;
    }
}


function addActiveSectionClass(){
            for(const section of sections){
                if(checkCurrentPositionTop(section)){
                    section.classList.add('your-active-class');
                    const anchor = document.querySelector(`a[href="#${section.id}"]`);
                    console.log('anchor is ' + anchor);
                    anchor.classList.add('active-link');
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
                    const anchor = document.querySelector('.active-link');
                    anchor.classList.remove('active-link');
                    console.log('remove active class');
                    
                }
            }else{
                addActiveSectionClass();
            }
    }

function scrollToSection(event){
    event.preventDefault();
    const href = event.target.getAttribute('href');
    if(href !== null){
        console.log(`clicked ${href.replace('#','')}`);
        const targetSection = document.getElementById(href.replace('#',''));
        const rect = targetSection.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        const headerOffset = document.querySelector('.page__header').offsetHeight;
        const position = rect + offset - headerOffset;
        console.log(position);
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        })
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
navBarList.addEventListener('click', scrollToSection);

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
