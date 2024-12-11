const odProfileBtn = document.querySelector("#od-profile");
const profileCard = document.querySelector("#profile-card");

odProfileBtn.addEventListener("click",(e)=>{
    profileCard.classList.toggle("profile-active");
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
    }
});