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
let beforePosition = 0;
let lastPosition = 0;
let timeout = null;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Get the section and add it to the menu.
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

/**
 * @param {Element} section 
 * @returns boolean
 * 
 * Check that the position including the top of the window and the height of the header is within the height of the section.
 */
function checkCurrentPosition(section){
    console.log('check');
    const scroll = window.pageYOffset;
    const top = Math.round(section.getBoundingClientRect().top + scroll);
    const bottom = Math.round(section.getBoundingClientRect().bottom + scroll);
    const headerOffset = document.querySelector('.page__header').offsetHeight; 
    const th = scroll + headerOffset;
    if(top <= th & th < bottom){
        console.log(`this is active${section.id}`);
        console.log(`top: ${top}, bottom: ${bottom}, th: ${th}`);
        return true;
    }else{
        return false;
    }
}

/**
 * Find the active section in the section node list and assign the class to the section and anchor.
 */
function addActiveClass(){
            for(const section of sections){
                if(checkCurrentPosition(section)){
                    section.classList.add('your-active-class');
                    const anchor = document.querySelector(`a[href="#${section.id}"]`);
                    console.log('anchor is ' + anchor);
                    anchor.classList.add('active-link');
                    console.log(`${section.id} is active`);
                    return;
                }
            }
}

/**
 * Locate the currently active section when the screen is scrolled.
 * If the active section is within the range, it will not be processed.
 * If the current section is out of range, or if there is no active section, go find a section that can be active.
 */
function activeSectionClass(){
    console.log("scroll");
    const current =  document.querySelector('.your-active-class');
    if(current !== null){
        if(checkCurrentPosition(current)){
            return;
        }else{
            current.classList.remove('your-active-class');
            const anchor = document.querySelector('.active-link');
            anchor.classList.remove('active-link');
            console.log('remove active class');
            addActiveClass();
        }
    }
    addActiveClass();
}

/**
 * @param {*} event 
 * 
 * When the anchor is clicked, the screen will scroll to the target section.
 */
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
 * Go to the top of the page.
 */
function btnClick(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
}

/**
 * The navigation bar will be fixed when the page is scrolled over the height of the navigation bar.
 * Also, the navigation bar will be hidden when scrolling down and will be fixed when scrolling up.
 * The navigation bar will also be fixed when the screen reaches the bottom of the page.
 * Hide fixed navigation bar while not scrolling.
 * Button will be displayed at that time.
 */
function scrollAnimation(){
    const pageHeader = document.querySelector('.page__header');
    const btn = document.querySelector('button');
    const th = pageHeader.offsetHeight;
    
    headerAnimation(pageHeader, th);
    btnAnimation(btn, th);

    lastPosition = beforePosition;
}

function btnAnimation(btn, th){
    if(beforePosition > th && beforePosition > lastPosition){
        btn.classList.remove('btn-upDown');
    }
    if(beforePosition < th || beforePosition < lastPosition){
        btn.classList.add('btn-upDown');
    }
}

function headerAnimation(header, th){
    const winH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const bottom = docH - winH;
    if(timeout != null){
        clearTimeout(timeout);
        console.log('clear')
    }
    if(beforePosition > th && beforePosition > lastPosition){
        header.classList.add('header-upDown');
    }
    if(beforePosition < th || beforePosition < lastPosition || bottom <= beforePosition){
        header.classList.remove('header-upDown');
        timeout = setTimeout(() => {
            header.classList.add('header-upDown')
            console.log('add by timeout')
            }, 2000);
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

window.addEventListener('scroll', ()=> {
    beforePosition = window.pageYOffset;
    scrollAnimation();
});

document.querySelector('button').onclick = btnClick;

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
