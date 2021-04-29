//   let goodSusTags = [
//     "100% organic cotton",
//     "Recycled materials",
//     "No exotic animal use",
//     "Eco-friendly materials",
//     "Forestry management",
//     "100% renewable energy",
//     "ZQ Merino Certified Wool",
//     "Water usage reduction",
//     "Chemical usage reduction",
//     "100% sustainable cotton",
//     "Uses blend of recycled wool"
// ]


//   let badSusTags = [
//     "Uses wool and leather",
//     "No textile waste reduction initiatives"
//   ]

//   let goodPractices = [
//     "Freedom of association",
//     "Nondiscrimination policies",
//     "Child labour policies",
//     "FLA Workplace code of conduct certified",
//     "100% living wage",
//     "Fair trade certified"
//   ]

//   let badPractices = [
//     "No chemical waste reduction initiatives",
//     "No COVID-19 worker protection",
//     "Living wage payment unclear",
//     "Unfavorable working conditions",
//     "No guarantee of living wage"
//   ]

//   let goodTransparency = [
//     "Reports available online",
//     "Supply chain transparent",
//     "Sustainable apparel coalition certified",
//     "Moderate supply chain transparency",
//     "OEKO TEX STANDARD 100 Certified",
//     "Bluesign certified",
//     "Responsible down standard certified"
//   ]

//   let badTransparency = [
//     "Low supply chain transparency",
//     "No supply chain certifications"
//   ]




  let SusTags = [
    "100% organic cotton",
    "Recycled materials",
    "No exotic animal use",
    "Eco-friendly materials",
    "Forestry management",
    "100% renewable energy",
    "ZQ Merino Certified Wool",
    "Water usage reduction",
    "Chemical usage reduction",
    "100% sustainable cotton",
    "Uses blend of recycled wool",
    "Uses wool and leather",
    "No textile waste reduction initiatives"
]


  let PracticeTags = [
    "Freedom of association",
    "Nondiscrimination policies",
    "Child labour policies",
    "FLA Workplace code of conduct certified",
    "100% living wage",
    "Fair trade certified",
    "No chemical waste reduction initiatives",
    "No COVID-19 worker protection",
    "Living wage payment unclear",
    "Unfavorable working conditions",
    "No guarantee of living wage"
  ]

  let TransparencyTags = [
    "Reports available online",
    "Supply chain transparent",
    "Sustainable apparel coalition certified",
    "Moderate supply chain transparency",
    "OEKO TEX STANDARD 100 Certified",
    "Bluesign certified",
    "Responsible down standard certified",
    "Low supply chain transparency",
    "No supply chain certifications"
  ]


let goodTags = [
  "Reports available online",
  "Supply chain transparent",
  "Sustainable apparel coalition certified",
  "Moderate supply chain transparency",
  "OEKO TEX STANDARD 100 Certified",
  "Bluesign certified",
  "Responsible down standard certified",
  "Freedom of association",
  "Nondiscrimination policies",
  "Child labour policies",
  "FLA Workplace code of conduct certified",
  "100% living wage",
  "Fair trade certified",
  "100% organic cotton",
  "Recycled materials",
  "No exotic animal use",
  "Eco-friendly materials",
  "Forestry management",
  "100% renewable energy",
  "ZQ Merino Certified Wool",
  "Water usage reduction",
  "Chemical usage reduction",
  "100% sustainable cotton",
  "Uses blend of recycled wool"
]

let badTags = [
  "Low supply chain transparency",
  "No supply chain certifications",
  "No chemical waste reduction initiatives",
  "No COVID-19 worker protection",
  "Living wage payment unclear",
  "Unfavorable working conditions",
  "No guarantee of living wage",
  "Uses wool and leather",
  "No textile waste reduction initiatives"
]


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
      body.className = "normal";
      moreContentDiv.style.display = "none";
      buttonImg.src = "./images/Vector.png";
    } else {
      body.className = "more";
      moreContentDiv.style.display = "inline";
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

  function url_domain(data) {
    var    a      = document.createElement('a');
           a.href = data;
    return a.hostname;
  }

  let domainName = ""
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    let activeTab = tabs[0];

    console.log(activeTab.url)
    
    domainName = url_domain(activeTab.url)
    console.log("domain Name is:" + domainName)

    domainNameSplit = domainName.split(".")[1]
    domainNameSplit = domainNameSplit
    domainNameSplit = capitalizeFirstLetter(domainNameSplit)
    if (domainNameSplit == "HM") {
      domainNameSplit = domainNameSplit.toUpperCase()
    }
    console.log(domainNameSplit)

    let failed = false

    fetch("https://api.root.quest/brandsearch?name="+domainNameSplit).then(d => {
      if (d.status >= 400) {
        console.log(d.text());
        failed = true;
        return d.text();
      }
      return d.json();
    }).then(d => {
      if (failed) {
        throw new Error(d);
      }
      if (d.Average) {
        console.log(d.Average)
        let img = document.getElementById("rating")
        if (d.Average > 1.0) {
          img.src = "./images/yellow-rating-bar.png"
        }

        if (d.Average > 2.0) {
          img.src = "./images/green-rating-bar.png"
        }
      }
      if (d.BrandName) {
        console.log("enter titles")
        let title1 = document.getElementById("rating-title");
        brand = d.BrandName;
        console.log("set innerHTML of first title")
        title1.innerHTML = "Here's our rating of " + brand;
        
        console.log("set innerHTML of second title")
        let title2 = document.getElementById("alternatives-title")
        title2.innerHTML = "Browse Sustainable Alternatives For " + brand;
      }
  
      if (d.Tags) {
        let tagString = d.Tags;
        let tagArr = tagString.split(",")
        console.log(tagArr)
        
        for (i = 0; i < tagArr.length; i++) {
          let tagName = tagArr[i].trim()
          tag = createTag(tagName);

          if (SusTags.includes(tagName)) {
            let susUL = document.getElementById("sus-tags");
            susUL.appendChild(tag);
          }

          if (PracticeTags.includes(tagName)) {
            let practiceUL = document.getElementById("eth-tags");
            practiceUL.appendChild(tag);
          }


          if (TransparencyTags.includes(tagName)) {
            let transparencyUL = document.getElementById("sup-tags");
            transparencyUL.appendChild(tag);
          }
        }
      }
  
    }).catch(e => {
    })

 });


  function createTag(tagName) {
    let tag = document.createElement("li");
    if (goodTags.includes(tagName)) {
      tag.className += "good";
    } else {
      tag.className += "bad";
    }
    tag.innerHTML = tagName;

    return tag;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }