  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

  let showMoreButton = document.getElementById('show-more');

  showMoreButton.addEventListener("click", function (){
    console.log("test");
    let body = document.getElementsByTagName('body')[0];
    let moreContentDiv = document.getElementById('moreContent');
    let buttonImg = document.getElementById("caret");
    if (body.className == "more") {
      body.className = "normal"
      moreContentDiv.style.display = "none";
      buttonImg.src = "./images/Vector.png";
    } else {
      body.className = "more";
      moreContentDiv.style.display = "inline"
      buttonImg.src = "./images/CaretUp.png";
    }
  });

  let alternativesButton = document.getElementById('alternativesButton');
  alternativesButton.addEventListener("click", function() {
    let ratingsDiv = document.getElementById("ratings");
    let alternativesDiv = document.getElementById("alternatives");
    console.log(ratingsDiv);
    ratingsDiv.style.display = "none";
    alternativesDiv.style.display = "flex";
  });


  let backButton = document.getElementById('backArrow');
  backButton.addEventListener("click", function(){
    let ratingsDiv = document.getElementById("ratings");
    let alternativesDiv = document.getElementById("alternatives");
    ratingsDiv.style.display = "inline";
    alternativesDiv.style.display = "none";
  });

  let closeButton = document.getElementById('closeButton');
  closeButton.addEventListener("click", function() {
    window.close();
    console.log("close");
  });

  let closeButton2 = document.getElementById('closeButton2');
  closeButton2.addEventListener("click", function() {
    window.close();
    console.log("close");
  });