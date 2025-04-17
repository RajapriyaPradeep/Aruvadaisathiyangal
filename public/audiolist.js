

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let isMobileView = true;
let apiUrl = "";

const width = window.innerWidth;

window.onload = function () {
  // if (width <= 480 && ((localStorage.getItem("viewmode") == null) || localStorage.getItem("viewmode") == undefined)) {
  //   localStorage.setItem("viewmode", "mobile");
  // }
  // if (width <= 480) {

  // }
  // else {
  //   // document.getElementById("devicemode").style.display = "none";
  // }
  fetchaudiodiscourses();
}
// const search = 'Technology';
// const apiUrl = 'http://localhost:5000/api/defaultvideos';
//const apiUrl = 'http://localhost:5000/api/videos?search=' + searchdata;


function fetchaudiodiscourses() {

  // const container = document.getElementById('gridcontainer');
  // container.innerHTML = ''; // Clear the container

  // Now call render again
  // grid.render();

  if (searchdata == "" || searchdata == null || searchdata == undefined)
    apiUrl = `https://aruvadaisathiyangal.vercel.app/api/searchkeywordaudios?search=${encodeURIComponent(searchkeyword)}`;
  else {
    if (searchdata == "recent")
      apiUrl = `https://aruvadaisathiyangal.vercel.app/api/recent`;
    else
      apiUrl = `https://aruvadaisathiyangal.vercel.app/api/videos?search=${encodeURIComponent(searchdata)}`;
  }
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        // If the response is not OK, throw an error with the status text
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      return response.json();  // Parse the response as JSON
    })
    .then(data => {
      const width = window.innerWidth;

      // if (width <= 480 && (localStorage.getItem("viewmode") == "mobile")) {
      document.getElementById("grid").style.display = "none";
      document.getElementById("titleAudioWidget").style.display = "block";
      //for mobile version
      const widgetContainer = document.getElementById("titleAudioWidget");
      // Function to render audio items
      function renderAudioItems(filteredData) {
        const widgetContainer = document.getElementById("titleAudioWidget");
        widgetContainer.innerHTML = "";

        if (filteredData.length === 0) {
          const noRecordsMessage = document.createElement("div");
          noRecordsMessage.className = "noRecordsMessage";
          noRecordsMessage.textContent = "No records available";
          widgetContainer.appendChild(noRecordsMessage);
          return;
        }

        filteredData.forEach(item => {
          const card = document.createElement("div");
          card.className = "audio-card";

          // Top circle image (overlapping)
          const circleIcon = document.createElement("div");
          circleIcon.className = "circle-icon";
          if (searchdata != null)
            circleIcon.innerHTML = `
            <img src="${item.imageUrl || './Assets/audioimages/' + searchdata + '.png'}" 
                 alt = "Badge Icon" class="circle-img" />
            `;

          // circleIcon.innerHTML = `
          // <img src="${item.imageUrl || './Assets/audioimages/' + searchdata + '.png'}" 
          //      alt = "Badge Icon" class="circle-img" />
          // `;
          // circleIcon.innerHTML = `
          //   <img src="${item.imageUrl || './Assets/audioimages/basics53.png'}" 
          //        alt="Badge Icon" class="circle-img" />
          // `;

          // Card content
          const cardDetails = document.createElement("div");
          cardDetails.className = "card-details";
          cardDetails.innerHTML = `
            <h3>${item.topic}</h3>
            <hr class="card-divider">
            <h3>${item.tamil}</h3>
          `;

          // Audio player container
          const audioPlayer = document.createElement("div");
          audioPlayer.className = "audio-player";
          audioPlayer.innerHTML = `
            <audio controls>
              <source src="${item.audioUrl}" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>
          `;

          // Action icons
          const iconList = document.createElement("ul");
          iconList.className = "card-icons";

          if (item.pdflink) {
            const pdfIcon = document.createElement("li");
            // pdfIcon.innerHTML = `<a href="${item.pdflink}" target="_blank" title="PDF"><img src="./Assets/audioimages/audiopdfres.png" height="75px"></a>`;
            pdfIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.pdflink}" target="_blank" title="PDF"><i class="fas fa-file-pdf glass-icon"></i></a></div>`;

            iconList.appendChild(pdfIcon);
          }

          if (item.pptlink) {
            const pptIcon = document.createElement("li");
            // pptIcon.innerHTML = `<a href="${item.pptlink}" target="_blank" title="PPT"><img src="./Assets/audioimages/audiopptres.png" height="75px"></a>`;
            pptIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.pptlink}" target="_blank" title="PPT"><i class="fas fa-file-powerpoint glass-icon"></i></a></div>`;
            iconList.appendChild(pptIcon);
          }

          const downloadIcon = document.createElement("li");
          // downloadIcon.innerHTML = `<a href="${item.audioUrl}" target="_blank" title="Download"><img src="./Assets/audioimages/audioresdownload.png" height="75px"></a>`;
          downloadIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.audioUrl}" target="_blank" title="Download"><i class="fas fa-download glass-icon"></i></a></div>`;
          iconList.appendChild(downloadIcon);

          // Assemble card
          card.appendChild(circleIcon);
          card.appendChild(cardDetails);
          card.appendChild(audioPlayer);
          card.appendChild(iconList);
          widgetContainer.appendChild(card);
        });
      }





      // Initial render
      renderAudioItems(data);
      updatesectiontitle(searchdata)

    })
    .catch(error => {
      console.error('Error fetching data:', error);  // Log the error in the console
      alert(`An error occurred while fetching the data: ${error.message}`);  // Display an alert with the error message
    });
}
function toggleViewMode() {
  // isMobileView = !isMobileView;

  // if (true) {
  //   // if (isMobileView) {
  //   localStorage.setItem("viewmode", "mobile");
  //   document.getElementById("devicemode").innerHTML = "💻";
  // }
  // else {
  //   localStorage.setItem("viewmode", "desktop");
  //   document.getElementById("devicemode").innerHTML = "📱";
  // }
  // document.getElementById('tooltip').innerText = isMobileView ? 'mobile' : 'Desktop Mode';
  // viewmode(isMobileView ? 'mobile' : 'desktop');
  fetchaudiodiscourses();
}
function updatesectiontitle(sectionname) {

  if (sectionname == "recent") {
    document.getElementById("discourcesectionname").textContent = "Recent Discources";
    return "Recent Discources";
  }
  else if (sectionname == "basicstudies") {
    document.getElementById("discourcesectionname").textContent = "Discources - Basics 53";
    return "Discources - Basics 53";
  }
  else if (sectionname == "kingdommessage") {
    document.getElementById("discourcesectionname").textContent = "Discources - Kingdom Message";
    return "Discources - Kingdom Message";
  }
  else if (sectionname == "characterdevelopment") {
    document.getElementById("discourcesectionname").textContent = "Discources - Character Development";
    return "Discources - Character Development";
  }
  else if (sectionname == "memorial") {
    document.getElementById("discourcesectionname").textContent = "Discources - Memorial";
    return "Discources - Memorial";
  }
  else if (sectionname == "prophetic") {
    document.getElementById("discourcesectionname").textContent = "Discources - Prophetic";
    return "Discources - Prophetic";
  }
  else if (sectionname == "spiritual") {
    document.getElementById("discourcesectionname").textContent = "Discources - Spiritual";
    return "Discources - Spiritual";
  }
  else if (sectionname == "typeantitype") {
    document.getElementById("discourcesectionname").textContent = "Discources - Type and Antitype";
    return "Discources - Type and Antitype";
  }
  else if (sectionname == "paneldiscussions") {
    document.getElementById("discourcesectionname").textContent = "Discources - Panel Discussions";
    return "Discources - Panel Discussions";
  }
  else if (sectionname == "testimonial") {
    document.getElementById("discourcesectionname").textContent = "Discources - Testimonal";
    return "Discources - Testimonal";
  }
  else if (sectionname == "vesperservice") {
    document.getElementById("discourcesectionname").textContent = "Discources - Vesper Service";
    return "Discources - Vesper Service";
  }
  else if (sectionname == "thebattleofarmageddon") {
    document.getElementById("discourcesectionname").textContent = "Volume Study 4 - The Battle of Armageddon";
    return "Volume Study 4 - The Battle of Armageddon";
  }
  else if (sectionname == "thenewcreation") {
    document.getElementById("discourcesectionname").textContent = "Volume Study 6 - The New Creation";
    return "Volume Study 6 - The New Creation";
  }
  else if (sectionname == "lifeofjesuschrist") {
    document.getElementById("discourcesectionname").textContent = "Book Study - Life of Jesus Christ";
    return "Book Study - Life of Jesus Christ";
  }
  else if (sectionname == "lifeofdavid") {
    document.getElementById("discourcesectionname").textContent = "Book Study - Life of David";
    return "Book Study - Life of David";
  }
  else if (sectionname == "orderanddisipline") {
    document.getElementById("discourcesectionname").textContent = "Book Study - Order and Discipline";
    return "Book Study - Order and Discipline";
  }
  else if (sectionname == "wildernesswandering") {
    document.getElementById("discourcesectionname").textContent = "Book Study - Wilderness Wandering";
    return "Book Study - Wilderness Wandering";
  }
  else if (sectionname == "christianconcepts") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Christian Concepts";
    return "Topical Study - Christian Concepts";
  }
  else if (sectionname == "ecclesiaelection") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Ecclesia Election";
    return "Topical Study - Ecclesia Election";
  }
  else if (sectionname == "endtimeprophecy") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - End Time Prophecy";
    return "Topical Study - End Time Prophecy";
  }
  else if (sectionname == "goldenrule") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Golden Rule";
    return "Topical Study - Golden Rule";
  }
  else if (sectionname == "gospelintheheaven") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Gospel in the Heaven";
    return "Topical Study - Gospel in the Heaven";
  }
  else if (sectionname == "israel") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Israel";
    return "Topical Study - Israel";
  }
  else if (sectionname == "pandemic") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Pandemic";
    return "Topical Study - Pandemic";
  }
  else if (sectionname == "parables") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Parables";
    return "Topical Study - Parables";
  }
  else if (sectionname == "perfectingholiness") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Perfecting Holiness";
    return "Topical Study - Perfecting Holiness";
  }
  else if (sectionname == "revelation") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Revelation";
    return "Topical Study - Revelation";
  }
  else if (sectionname == "sin") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Sin";
    return "Topical Study - Sin";
  }
  else if (sectionname == "spiritbegettal") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Spirit Begettal";
    return "Topical Study - Spirit Begettal";
  }
  else if (sectionname == "understandinggreattribulation") {
    document.getElementById("discourcesectionname").textContent = "Topical Study - Understanding Great Tribulation";
    return "Topical Study - Understanding Great Tribulation";
  }
  else {
    document.getElementById("discourcesectionname").textContent = searchdata;
    return searchdata;
  }

}
// Function to handle sharing
function shareAudio(url) {
  alert(`Sharing audio: ${url}`);
}
function searchaudio() {
  if (document.getElementById("searchkeyword").value != "") {
    let search_keyword = document.get
    window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?srch=' + document.getElementById("searchkeyword").value;
  }
}
function showdivineplan() {
  const modal = document.getElementById("divinePlanModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("divinePlanModal");
  modal.style.display = "none";
}
function navplaylist(modulename) {
  if (modulename == "home")
    window.location.href = 'https://aruvadaisathiyangal.in/index.html';
  else if (modulename == "aboutus")
    window.location.href = 'https://aruvadaisathiyangal.in/aboutus.html';
  else if (modulename == "youtubevideos")
    window.location.href = 'https://aruvadaisathiyangal.in/youtubediscourses.html';
  else
    window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?module=' + modulename;
  // window.location.href = 'file:///E:/NC/Task/video-listing-app/audiolist.html?module=' + modulename;
}

function searchaudio() {
  if (document.getElementById("searchkeyword").value != "") {
    let search_keyword = document.get
    window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?srch=' + document.getElementById("searchkeyword").value;
  }
}
// Getting the image map title exactly at the appropriate location
// Function to show the custom styled tooltip based on the title attribute
function showCustomTooltip(event) {
  // Prevent the default tooltip by removing the title attribute temporarily
  const title = event.target.getAttribute("title");
  event.target.removeAttribute("title");

  const tooltip = document.createElement("div"); // Create a new div for the tooltip
  // tooltip.classList.add("custom-tooltip");
  //Change color as per the type
  if (title == "The World That Was --1st Dispensation" || title == "The Present Evil World --2nd Dispensation" || title == "The World to Come --3rd Dispensation" || title == "Patriarchal Age" || title == "Jewish Age" || title == "Gospel Age" || title == "Messianic Age" || title == "Ages to Come" || title == "Israel's time of trouble in Jewish Harvest:Separation of Wheat and Chaff" || title == "World's time of trouble in Gospel Harvest:Separation of Wheat and Tares" || title == "Satan's Little Season") {
    tooltip.style.backgroundColor = "#f9f9f9";
    tooltip.style.color = "#555555";
  }
  else if (title == "State of divine glory and power of office" || title == "State of spirit birth" || title == "State of spirit begettal" || title == "State of God's favor (to humans)" || title == "State of God's typical favor" || title == "State of Sin and depravity") {
    tooltip.style.backgroundColor = "#fcfcfc";
    tooltip.style.color = "#1a73e8";
  }
  else if (title == "Adam in perfection" || title == "Fallen Adam and his posterity, before the flood" || title == "Ancient worthies as individuals" || title == "Mankind from flood to Messianic Age" || title == "Fleshly Israel typically justified as a nation") {
    tooltip.style.backgroundColor = "#ffffff";
    tooltip.style.color = "#ff6f61";
  }
  else if (title == "Jesus at age 30, a perfect man" || title == "Jesus, spirit-begotten at Jordan" || title == "Jesus, resurrected as a divine being" || title == "Jesus, 40 days after resurrection, in divine glory" || title == "Jesus, in Gospel Age, set down with Father on throne") {
    tooltip.style.backgroundColor = "#7a2a2a";
    tooltip.style.color = "#e5d8c4";
  }
  else if (title == "Spirit-begotten class who become the Great Company" || title == "Spirit-begotten Class who become the Bride of Christ" || title == "Believers, but not fully consecrated" || title == "Wolves in sheep's clothing; church-goers, but not believers; hypocrites") {
    tooltip.style.backgroundColor = "#f5fffa";
    tooltip.style.color = "#008080";
  }
  else if (title == "Jesus, at His second advent" || title == "Little Flock, separating from Babylon" || title == "Great Company, failing to gain chief reward" || title == "Babylon, larger part of the nominal church, falling; some remaining on Plane N, others falling below" || title == "Babylon, hypocrite element of nominal church, falling to Plane R with unbelievers" || title == "The glorified Christ, head and body") {
    tooltip.style.backgroundColor = "#ffffff";
    tooltip.style.color = "#2c2c2c";
  }
  else {
    tooltip.style.backgroundColor = "#f7f8ef";
    tooltip.style.color = "#556b2f";
  }

  tooltip.style.position = "absolute";
  tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  tooltip.style.padding = "8px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.fontSize = "14px";
  tooltip.style.pointerEvents = "none"; // Prevents the tooltip from blocking other interactions
  tooltip.style.zIndex = "2000";
  tooltip.style.fontFamily = "serif";

  tooltip.textContent = title; // Set the tooltip text to the removed title content

  // Position the tooltip based on the area element's position
  const area = event.target;
  const coords = area.getAttribute("coords").split(",").map(Number);
  const img = document.getElementById("chart-image");
  const imgRect = img.getBoundingClientRect();

  // Calculate tooltip position based on area coordinates
  const x = coords[0] + imgRect.left + 10; // Slight offset for better alignment
  const y = coords[1] + imgRect.top - 30; // Slight offset to avoid overlap

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;

  // Append the tooltip to the body
  document.body.appendChild(tooltip);

  // Store the tooltip and the original title text for later restoration
  event.target.tooltip = tooltip;
  event.target.originalTitle = title;
}

// Function to hide the custom tooltip
function hideCustomTooltip(event) {
  const tooltip = event.target.tooltip;
  if (tooltip) {
    tooltip.remove(); // Remove the custom tooltip from the DOM
  }

  // Restore the original title attribute to show the default tooltip again
  const originalTitle = event.target.originalTitle;
  if (originalTitle) {
    event.target.setAttribute("title", originalTitle);
  }
}

// Attach event listeners to each map area
const areas = document.querySelectorAll('.area-tooltip');
areas.forEach(area => {
  area.addEventListener('mouseover', showCustomTooltip);
  area.addEventListener('mouseout', hideCustomTooltip);
});

