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
    // e.stopPropagation();
});

 // Event listener for document
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

// Select all links and content containers
const links = document.querySelectorAll('.course-category-info');

// Add click event to each link
links.forEach(link => {
    link.addEventListener('click', event => {
        // event.preventDefault(); // Prevent default link behavior

        // Remove active class from all links and hide all content
        links.forEach(link => link.classList.remove('course-category-info-active'));

        // Add active class to the clicked link
        link.classList.add('course-category-info-active');
    });
});

// !-----------------od-course-expand----------------------




const allCrsesNavBtn = document.querySelector("#allCrsesNavBtn");
const allCrsesNavarrow = document.querySelector("#allCrsesNavBtn img");
const odCourseExpand = document.querySelector(".od-course-expand");


allCrsesNavBtn.addEventListener("click",(e)=>{
    odCourseExpand.classList.toggle("od-course-expand-active");
    allCrsesNavarrow.classList.toggle("rotate-180");
  
});

 // Event listener for document
document.addEventListener('click', (event) => {
    const isClickInsideDiv = odCourseExpand.contains(event.target);
    console.log(isClickInsideDiv);

    const isClickOnButton = event.target === allCrsesNavBtn;
    console.log(isClickOnButton);
    const isDivVisible = odCourseExpand.classList.contains('od-course-expand-active');
    console.log(isDivVisible);

    if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
        odCourseExpand.classList.remove('od-course-expand-active');
        allCrsesNavarrow.classList.remove("rotate-180");
    }
});

