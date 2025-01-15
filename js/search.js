// const clickedHidden = document.querySelector("#clicked-hidden");
// const makeHidden = document.querySelector("#make-hidden");
// const searchEngine = document.querySelector("#search-engine");
// const backgroundShadow = document.querySelector("#background-shadow");

// document.addEventListener('click', (event) => {
//     const isClickInsideDiv = searchEngine.contains(event.target);
//     console.log(isClickInsideDiv);
//     /**
//      * ! parentNode.contains(childNode); Returns:
//      *  true: If childNode is the same as parentNode or a descendant of parentNode.
//      *  false: If childNode is not a descendant of parentNode.
//      */

//     const isClickOnButton = event.target === clickedHidden;
//     console.log(isClickOnButton)
//     const isDivVisible = searchEngine.classList.contains('d-flex');
//     console.log(isDivVisible);

//     if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
//         console.log("-------------------")
//         makeHidden.classList.remove("d-none");
//         searchEngine.classList.remove("d-flex");
//         backgroundShadow.classList.add("d-none");
//     }
// });

// clickedHidden.addEventListener("click",(e)=>{
// //   clickedHidden.classList.add("d-none");
//   makeHidden.classList.add("d-none");
//   searchEngine.classList.add("d-flex");
//   backgroundShadow.classList.remove("d-none");
// });



const clickedHidden = document.querySelector("#clicked-hidden");
const makeHidden = document.querySelector("#make-hidden");
const searchEngine = document.querySelector("#search-engine");
const backgroundShadow = document.querySelector("#background-shadow");

document.addEventListener("click", (event) => {
  const isClickInsideDiv = searchEngine.contains(event.target);
  const isClickOnButton = event.target.closest("#clicked-hidden") !== null;
  const isDivVisible = searchEngine.classList.contains("d-flex");


  if (!isClickInsideDiv && !isClickOnButton && isDivVisible) {
    console.log("Hiding search engine...");
    makeHidden.classList.remove("d-none");
    searchEngine.classList.remove("d-flex");
    searchEngine.classList.add("d-none");
    backgroundShadow.classList.add("d-none");
    body.classList.remove('no-scroll');
  }
});

clickedHidden.addEventListener("click", () => {
  
  makeHidden.classList.add("d-none");
  searchEngine.classList.add("d-flex");
  searchEngine.classList.remove("d-none");
  backgroundShadow.classList.remove("d-none");
  body.classList.add('no-scroll');
});


