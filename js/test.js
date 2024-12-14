const odProfileBtn = document.querySelector("#od-profile");
const profileCard = document.querySelector("#profile-card");
const selfInfoContainer = document.querySelector(".self-info-container")
const verify = document.querySelector(".verify");
const classJoin = document.querySelector(".class-join");
const navigateBtnContainer = document.querySelector(".navigate-btn-container");


// Select all links and content containers
const links = document.querySelectorAll('.course-category-info');

const allCrsesNavBtn = document.querySelector("#allCrsesNavBtn");
const odCourseExpand = document.querySelector(".od-course-expand");



// Profile card toggle
if (odProfileBtn && profileCard) {
    odProfileBtn.addEventListener("click", (e) => {
        profileCard.classList.toggle("profile-active");
        selfInfoContainer.classList.toggle("self-info-container-active");
        verify.classList.toggle("verify-active");
        classJoin.classList.toggle("verify-active");
        navigateBtnContainer.classList.toggle("navigate-btn-container-active");
        // e.stopPropagation(); // Uncomment if necessary
    });
}

// Course category links
const links = document.querySelectorAll('.course-category-info');
links.forEach(link => {
    link.addEventListener('click', (event) => {
        links.forEach(l => l.classList.remove('course-category-info-active'));
        link.classList.add('course-category-info-active');
    });
});

// Course expand toggle
if (allCrsesNavBtn && odCourseExpand) {
    allCrsesNavBtn.addEventListener("click", (e) => {
        odCourseExpand.classList.toggle("od-course-expand-active");
    });
}

// Document-wide click handling
document.addEventListener('click', (event) => {
    // Profile card
    if (profileCard) {
        const isClickInsideProfile = profileCard.contains(event.target);
        const isClickOnProfileButton = event.target === odProfileBtn;
        if (!isClickInsideProfile && !isClickOnProfileButton) {
            profileCard.classList.remove('profile-active');
            selfInfoContainer.classList.remove('self-info-container-active');
            verify.classList.remove('verify-active');
            classJoin.classList.remove('verify-active');
            navigateBtnContainer.classList.remove('navigate-btn-container-active');
        }
    }

    // Course expand
    if (odCourseExpand) {
        const isClickInsideCourse = odCourseExpand.contains(event.target);
        const isClickOnCourseButton = event.target === allCrsesNavBtn;
        if (!isClickInsideCourse && !isClickOnCourseButton) {
            odCourseExpand.classList.remove('od-course-expand-active');
        }
    }
});
