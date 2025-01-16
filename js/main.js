//!---------------Profile Btn------------------
const odProfileBtn = document.querySelector("#od-profile");
const profileCard = document.querySelector("#profile-card");
const selfInfoContainer = document.querySelector(".self-info-container")
const verify = document.querySelector(".verify");
const classJoin = document.querySelector(".class-join");
const navigateBtnContainer = document.querySelector(".navigate-btn-container");

odProfileBtn.addEventListener("click",(e)=>{
    profileCard.classList.toggle("profile-active");
    selfInfoContainer.classList.toggle("self-info-container-active");
    verify.classList.toggle("verify-active");
    classJoin.classList.toggle("verify-active");
    navigateBtnContainer.classList.toggle("navigate-btn-container-active");
});

function profileCardToggler(event){
    const isClickInsideDiv = profileCard.contains(event.target);
    /**
     * ! parentNode.contains(childNode); Returns:
     *  true: If childNode is the same as parentNode or a descendant of parentNode.
     *  false: If childNode is not a descendant of parentNode.
     */

    const isClickOnButton = event.target === odProfileBtn;
    const isDivVisible = profileCard.classList.contains('profile-active');

    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
        profileCard.classList.remove('profile-active');
        selfInfoContainer.classList.remove('self-info-container-active');
        verify.classList.remove("verify-active");
        classJoin.classList.remove("verify-active");
        navigateBtnContainer.classList.remove("navigate-btn-container-active");
    }
}

//!---------------All Courses------------------

//course category wrapper
const links = document.querySelectorAll('.course-category-info');

links.forEach(link => {
    link.addEventListener('click', event => {
        links.forEach(link => link.classList.remove('course-category-info-active'));
        link.classList.add('course-category-info-active');
    });
});

//od-course-expand

const allCrsesNavBtn = document.querySelector("#allCrsesNavBtn");
const allCrsesNavarrow = document.querySelector("#allCrsesNavBtn img");
const odCourseExpand = document.querySelector(".od-course-expand");
const odCourseExpandInside = document.querySelector(".od-course-expand-inside");
const odSmallExpandable = document.querySelector(".od-small-expandable");
const expandCollapseBtnContainer = document.querySelector('.expand-s-collapse-btn-container');
const expandableContent = document.querySelector('.expand-s-content');
const body = document.body;


allCrsesNavBtn.addEventListener("click",(e)=>{
    let viewportWidth = document.documentElement.clientWidth;
    if(viewportWidth > 1023){
        odCourseExpand.classList.toggle("od-course-expand-active");
        allCrsesNavarrow.classList.toggle("rotate-180");
        body.classList.toggle('no-scroll');
    }
    else{
        odSmallExpandable.classList.toggle('d-flex');
        body.classList.add('no-scroll');
    }

});

expandCollapseBtnContainer.addEventListener('click',()=>{
    odSmallExpandable.classList.remove('d-flex');
    body.classList.remove('no-scroll');
});


window.addEventListener('resize',()=>{
    let viewportWidth = document.documentElement.clientWidth;
    
    let isContains= odSmallExpandable.classList.contains('d-flex') || odCourseExpand.classList.contains('od-course-expand-active');
    if(isContains){
        if(viewportWidth >1023){
            if(odSmallExpandable.classList.contains('d-flex')){
                odSmallExpandable.classList.remove('d-flex');
            }
            if(!odCourseExpand.classList.contains('od-course-expand-active')){
                odCourseExpand.classList.add("od-course-expand-active");
                allCrsesNavarrow.classList.add("rotate-180");
                body.classList.add('no-scroll');
            }
        }else{
            if(odCourseExpand.classList.contains('od-course-expand-active')){
                odCourseExpand.classList.remove("od-course-expand-active");
                allCrsesNavarrow.classList.remove("rotate-180");
            }
            if(!odSmallExpandable.classList.contains('d-flex')){
                odSmallExpandable.classList.add('d-flex')
            }
        }
    }
})

function allCourseExpander(event){

    const isClickInsideDiv = odCourseExpandInside.contains(event.target);
    const isClickOnButton = event.target === allCrsesNavBtn;
    const isDivVisible = odCourseExpand.classList.contains('od-course-expand-active');

    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
        odCourseExpand.classList.remove('od-course-expand-active');
        allCrsesNavarrow.classList.remove("rotate-180");
        body.classList.remove('no-scroll');
    }
}

//OD Samall expand
const collapseContainer = document.querySelector('.expand-s-collapse');
const expandSLineContainer = document.querySelector('.expand-s-horizontal-cont');

let initialCursorYPos = 0;
let initialContentHeight = 0;
let initialCollapseHeight = 0;
let isResizing = false;

// Helper function to get Y position for both mouse and touch
function getYPosition(event) {
    return event.touches ? event.touches[0].clientY : event.clientY;
}

// Helper to set heights
function setHeights(contentHeight, collapseHeight) {
    expandableContent.style.height = `${contentHeight}px`;
    collapseContainer.style.height = `${collapseHeight}px`;
}

// Start resizing (mousedown/touchstart)
function startResizing(event) {
    const clickArea = expandSLineContainer.getBoundingClientRect();
    const currentY = getYPosition(event);

    if (currentY >= clickArea.top && currentY <= clickArea.bottom) {
        const contentBox = expandableContent.getBoundingClientRect();
        const collapseBox = collapseContainer.getBoundingClientRect();

        initialCursorYPos = currentY;
        initialContentHeight = contentBox.height;
        initialCollapseHeight = collapseBox.height;
        isResizing = true;

        event.preventDefault(); // Prevent scrolling on touch devices
    }
}

// Resizing (mousemove/touchmove)
function resizeContent(event) {
    if (isResizing) {
        const currentY = getYPosition(event);
        const offset = currentY - initialCursorYPos;
        setHeights(initialContentHeight - offset, initialCollapseHeight + offset);
    }
}

// Stop resizing and adjust height (mouseup/touchend)
function stopResizing(event) {
    if (isResizing) {
        isResizing = false;

        const viewportHeight = window.innerHeight;
        const contentBox = expandableContent.getBoundingClientRect();
        const topVH = (contentBox.height / viewportHeight) * 100;

        // Adjust height based on top position
        if (topVH >= 25 && topVH <= 75) {
            setHeights(viewportHeight * 0.55, viewportHeight * 0.45); // Reset to 55vh
            expandableContent.querySelector('.expand-s-crses').style.paddingBottom = '0';
        } else if (topVH > 75) {
            setHeights(viewportHeight - 45, 45); // Full size - 45px
            expandableContent.querySelector('.expand-s-crses').style.paddingBottom = '16px';
        } else if (topVH < 25) {
            setHeights(0, viewportHeight); // Collapse
            expandableContent.querySelector('.expand-s-crses').style.paddingBottom = '0';
        }
    }
}

// Event listeners for mouse
expandSLineContainer.addEventListener('mousedown', startResizing);
document.addEventListener('mousemove', resizeContent);
document.addEventListener('mouseup', stopResizing);

// Event listeners for touch
expandSLineContainer.addEventListener('touchstart', startResizing);
document.addEventListener('touchmove', resizeContent);
document.addEventListener('touchend', stopResizing);


// Courses Slider
const expandSCourseArrow = document.querySelectorAll('.expand-s-course-arrow');
const expandSCont = document.querySelectorAll('.expand-s-coresponiding-crses-cont');
const correspondCrsesContainer = document.querySelectorAll('.expand-s-coresponiding-crses');
const correspondCrsesWrap = document.querySelectorAll('.expand-s-coresponiding-crses-wrp');
const expandSliderLeftBtn = document.querySelectorAll('.expand-s-left-btn');
const expandSliderRightBtn = document.querySelectorAll('.expand-s-right-btn');

expandSCourseArrow.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        expandSCont[index].classList.toggle('d-flex');
        item.querySelector('img').classList.toggle('rotatate');

        // cards details
        const cardWidth = 149;
        const gap = 6;
        let currentOffset = 0;

        const visibleAreaWidth = correspondCrsesContainer[index].offsetWidth;

        // Calculate the total scrollable width
        const totalScrollableWidth = correspondCrsesWrap[index].scrollWidth - visibleAreaWidth;

        // Update button visibility
        function updateButtonVisibility() {
            expandSliderLeftBtn[index].style.display = currentOffset === 0 ? "none" : "block";
            expandSliderRightBtn[index].style.display = currentOffset >= totalScrollableWidth ? "none" : "block";
        }

        // Slide to the left
        expandSliderLeftBtn[index].addEventListener("click", () => {
        
            currentOffset = Math.max(0, currentOffset - (cardWidth + gap));
            correspondCrsesWrap[index].style.transform = `translateX(-${currentOffset}px)`;
            updateButtonVisibility();
        });

        // Slide to the right
        expandSliderRightBtn[index].addEventListener("click", () => {
        
            currentOffset = Math.min(totalScrollableWidth , currentOffset + (cardWidth + gap));
            correspondCrsesWrap[index].style.transform = `translateX(-${currentOffset}px)`;
            updateButtonVisibility();
        });

        updateButtonVisibility();
    })
})


//!--------------Notifications-----------------

const odAllNotifications = document.querySelector(".od-all-notifications");
const odNotiBtn = document.querySelector(".od-notification-container");

odNotiBtn.addEventListener("click",(event)=>{
    // event.stopPropagation();
    odAllNotifications.classList.toggle('d-flex');
})

function notificationController(event){
    const isClickInsideDiv = odAllNotifications.contains(event.target);
    const isClickOnButton = event.target === odNotiBtn;
    const isDivVisible = odAllNotifications.classList.contains('d-flex');

    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {   
        odAllNotifications.classList.remove('d-flex');
    }
}

//!----------------Downloads-------------------

const leftNavDownCont = document.querySelector('.left-nav-down-cont');
const leftNavDownBtnWrap = document.querySelectorAll('.down-btn-wraper');
const leftNavDownBtn = document.querySelector('#left-nav-download > a');

leftNavDownBtn.addEventListener("click",(event)=>{
    leftNavDownCont.classList.toggle('left-nav-down-cont-active');
    leftNavDownBtnWrap.forEach((item)=>{
        item.classList.toggle('down-btn-wraper-active')
    })
    
})

// Close dropdown when clicking outside
function closeDownloadDropdown(event){
    const isClickInsideDiv = leftNavDownCont.contains(event.target);
    const isClickOnButton = leftNavDownBtn.contains(event.target); //Includes child elements
    const isDivVisible = leftNavDownCont.classList.contains('left-nav-down-cont-active');
    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
        leftNavDownCont.classList.remove('left-nav-down-cont-active');
        leftNavDownBtnWrap.forEach((item) => {
            item.classList.remove('down-btn-wraper-active');
        });
    }
}
//!--------------Search Engine-----------------
const clickedHidden = document.querySelector("#clicked-hidden");
const makeHidden = document.querySelector("#make-hidden");
const searchEngine = document.querySelector("#search-engine");
const backgroundShadow = document.querySelector("#background-shadow");

clickedHidden.addEventListener("click", () => {
  
  makeHidden.classList.add("d-none");
  searchEngine.classList.add("d-flex");
  searchEngine.classList.remove("d-none");
  backgroundShadow.classList.remove("d-none");
  body.classList.add('no-scroll');
});

function searchEngineController(event){
    const isClickInsideDiv = searchEngine.contains(event.target);
    const isClickOnButton = event.target.closest("#clicked-hidden") !== null;
    const isDivVisible = searchEngine.classList.contains("d-flex");
  
    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
      makeHidden.classList.remove("d-none");
      searchEngine.classList.remove("d-flex");
      searchEngine.classList.add("d-none");
      backgroundShadow.classList.add("d-none");
      body.classList.remove('no-scroll');
    }
}

//!--------------Clicked Outside---------------

document.addEventListener('click', (event) => {
    //!---------------Profile Btn------------------
    if(profileCard.classList.contains('profile-active')) profileCardToggler(event);

    //!---------------All Courses------------------
    if(odCourseExpand.classList.contains('od-course-expand-active')) allCourseExpander(event);

    //!--------------Notifications-----------------
    if(odAllNotifications.classList.contains('d-flex')) notificationController(event);

    //!----------------Downloads-------------------
    if(leftNavDownCont.classList.contains('left-nav-down-cont-active')) closeDownloadDropdown(event);
    //!--------------Search Engine-----------------
    if(searchEngine.classList.contains("d-flex")) searchEngineController(event);
   
});