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


document.addEventListener('click', (event) => {
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
});


// !-------------------course-category-wraper---------------------------

const links = document.querySelectorAll('.course-category-info');


links.forEach(link => {
    link.addEventListener('click', event => {
        links.forEach(link => link.classList.remove('course-category-info-active'));
        link.classList.add('course-category-info-active');
    });
});





// !-----------------od-course-expand----------------------

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

// !------finished-------------

document.addEventListener('click', (event) => {
    const isClickInsideDiv = odCourseExpandInside.contains(event.target);
    console.log(isClickInsideDiv);

    const isClickOnButton = event.target === allCrsesNavBtn;
    console.log(isClickOnButton);
    const isDivVisible = odCourseExpand.classList.contains('od-course-expand-active');
    console.log(isDivVisible);

    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
        odCourseExpand.classList.remove('od-course-expand-active');
        allCrsesNavarrow.classList.remove("rotate-180");
        body.classList.remove('no-scroll');
    }
});






// !___________OD_small_expnad___________________


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


// !________________________Courses Slider_______________________________



const expandSCourseArrow = document.querySelectorAll('.expand-s-course-arrow');
const expandSCont = document.querySelectorAll('.expand-s-coresponiding-crses-cont');


const correspondCrsesContainer = document.querySelectorAll('.expand-s-coresponiding-crses');
const correspondCrsesWrap = document.querySelectorAll('.expand-s-coresponiding-crses-wrp');
const expandSliderLeftBtn = document.querySelectorAll('.expand-s-left-btn');
const expandSliderRightBtn = document.querySelectorAll('.expand-s-right-btn');

// expandSCourseArrow.addEventListener('click',(e)=>{
//     expandSCont.classList.toggle('d-flex');
// });
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
