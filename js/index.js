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