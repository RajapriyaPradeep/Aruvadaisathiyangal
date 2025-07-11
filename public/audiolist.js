const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let isMobileView = true;
let apiUrl = "";

const width = window.innerWidth;
let currentView = "card";

// function toggleLayout() {
//   const widget = document.getElementById("titleAudioWidget");
//   const icon = document.querySelector("#viewToggleBtn i");

//   // Update currentView before fetching
//   if (currentView === "card") {
//     widget.classList.remove("card-grid");
//     widget.classList.add("list-view");
//     icon.classList.remove("fa-th-large");
//     icon.classList.add("fa-list");
//     currentView = "list";
//   } else {
//     widget.classList.remove("list-view");
//     widget.classList.add("card-grid");
//     icon.classList.remove("fa-list");
//     icon.classList.add("fa-th-large");
//     currentView = "card";
//   }

//   // Now refetch and render based on new view mode
//   fetchaudiodiscourses();
// }
function toggleLayout() {
  const widget = document.getElementById("titleAudioWidget");
  const icon = document.querySelector("#viewToggleBtn i");

  if (currentView === "card") {
    currentView = "grid";
    icon.classList.remove("fa-th-large");
    icon.classList.add("fa-table");
  } else {
    currentView = "card";
    icon.classList.remove("fa-table");
    icon.classList.add("fa-th-large");
  }

  fetchaudiodiscourses();
}



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

  filteredData.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "audio-card";



    // Top circle image (overlapping)
    let circleIcon = null;
    if (currentView === "card" && searchdata != null) {
      circleIcon = document.createElement("div");
      circleIcon.className = "circle-icon";
      circleIcon.innerHTML = `
    <img src="${item.imageUrl || './Assets/audioimages/' + searchdata + '.png'}" 
         alt="Badge Icon" class="circle-img" />
  `;
    }

    if (circleIcon) {
      card.appendChild(circleIcon);
    }
    // Year badge on top-right corner
    if (currentView === "card" && item.year) {

      const sourcebadge = document.createElement("div");
      sourcebadge.className = "year-badge";
      sourcebadge.innerHTML = `<span class="badge year">V</span>`;
      card.appendChild(sourcebadge);

      const yearBadge = document.createElement("div");
      yearBadge.className = "year-badge";
      yearBadge.innerHTML = `<span class="badge year">${item.year}</span>`;
      card.appendChild(yearBadge);
    }

    // Card content
    const cardDetails = document.createElement("div");
    cardDetails.className = "card-details";
    cardDetails.innerHTML = `
      <h3>${item.topic}</h3>
      <hr class="card-divider">
      <h3 class="card-tamil-content">${item.tamil}</h3>
    `;
    // const cardDetails = document.createElement("div");
    // cardDetails.className = "card-details";
    // cardDetails.innerHTML = `
    //   <h3>${item.topic}</h3>
    //   <hr class="card-divider">
    //   <h3>${item.tamil}</h3>
    //   <div class="badge-container">
    //     ${item.section ? `<span class="badge section">${item.section}</span>` : ""}
    //   </div>
    // `;

    // Audio player container
    const audioPlayer = document.createElement("div");
    audioPlayer.className = "audio-player";
    audioPlayer.innerHTML = `
  <audio controls preload="none" src="data:audio/mp3;base64,//uQxAALAAAADQAAAANAAACAAACAgACAAAAAQACAgICAwMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgoLCwsMD...
" data-src="${item.audioUrl}">
  Your browser does not support the audio element.
  </audio>
`;
    // audioPlayer.innerHTML = `
    //   <audio controls>
    //     <source src="${item.audioUrl}" type="audio/mp3">
    //     Your browser does not support the audio element.
    //   </audio>
    // `;

    // Action icons
    const iconList = document.createElement("ul");
    iconList.className = "card-icons";

    if (item.pdflink) {
      const pdfIcon = document.createElement("li");
      pdfIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.pdflink}" target="_blank" title="PDF"><i class="fas fa-file-pdf glass-icon"></i></a></div>`;
      iconList.appendChild(pdfIcon);
    }

    if (item.pptlink) {
      const pptIcon = document.createElement("li");
      pptIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.pptlink}" target="_blank" title="PPT"><i class="fas fa-file-powerpoint glass-icon"></i></a></div>`;
      iconList.appendChild(pptIcon);
    }

    const downloadIcon = document.createElement("li");
    downloadIcon.innerHTML = `<div class="glass-icon-wrapper"><a href="${item.audioUrl}" target="_blank" title="Download"><i class="fas fa-download glass-icon"></i></a></div>`;
    iconList.appendChild(downloadIcon);

    // Assemble card
    if (circleIcon) {
      card.appendChild(circleIcon);
    }
    card.appendChild(cardDetails);
    card.appendChild(audioPlayer);
    card.appendChild(iconList);
    widgetContainer.appendChild(card);
  });
}


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
      // document.getElementById("grid").style.display = "none";
      // document.getElementById("titleAudioWidget").style.display = "block";
      //for mobile version
      const widgetContainer = document.getElementById("titleAudioWidget");






      // Initial render
      // renderAudioItems(data);
      // updatesectiontitle(searchdata)

      if (currentView === "card") {
        document.getElementById("grid").style.display = "none";
        document.getElementById("grid-scroll").style.display = "none";
        document.getElementById("scrollable-wrapper").style.display = "block";
        document.getElementById("titleAudioWidget").style.display = "block";
        renderAudioItems(data);
      } else if (currentView === "grid") {
        document.getElementById("titleAudioWidget").style.display = "none";
        document.getElementById("scrollable-wrapper").style.display = "none";
        document.getElementById("grid").style.display = "block";
        document.getElementById("grid-scroll").style.display = "block";
        renderGridView(data);
      }

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
    // document.getElementById("discourcesectionname").textContent = "Recent Discources";
    return "New";
  }
  else if (sectionname == "basicstudies") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Basics 53";
    return "Basics 53";
  }
  else if (sectionname == "kingdommessage") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Kingdom Message";
    return "Kingdom Message";
  }
  else if (sectionname == "characterdevelopment") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Character Development";
    return "Character Development";
  }
  else if (sectionname == "memorial") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Memorial";
    return "Memorial";
  }
  else if (sectionname == "prophetic") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Prophetic";
    return "Prophetic";
  }
  else if (sectionname == "ot") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Prophetic";
    return "ot";
  }
  else if (sectionname == "spiritual") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Spiritual";
    return "Spiritual";
  }
  else if (sectionname == "typeantitype") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Type and Antitype";
    return "Type and Antitype";
  }
  else if (sectionname == "paneldiscussions") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Panel Discussions";
    return "Panel Discussions";
  }
  else if (sectionname == "testimonial") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Testimonal";
    return "Testimonal";
  }
  else if (sectionname == "vesperservice") {
    // document.getElementById("discourcesectionname").textContent = "Discources - Vesper Service";
    return "Vesper Service";
  }
  else if (sectionname == "thebattleofarmageddon") {
    // document.getElementById("discourcesectionname").textContent = "Volume Study 4 - The Battle of Armageddon";
    return "V4 The Battle of Armageddon";
  }
  else if (sectionname == "thenewcreation") {
    // document.getElementById("discourcesectionname").textContent = "Volume Study 6 - The New Creation";
    return "V6 The New Creation";
  }
  else if (sectionname == "bookofromans") {
    // document.getElementById("discourcesectionname").textContent = "Book Study - Life of Jesus Christ";
    return "Book of Romans";
  }
  else if (sectionname == "lifeofjesuschrist") {
    // document.getElementById("discourcesectionname").textContent = "Book Study - Life of Jesus Christ";
    return "Life of Jesus Christ";
  }
  else if (sectionname == "lifeofdavid") {
    // document.getElementById("discourcesectionname").textContent = "Book Study - Life of David";
    return "Life of David";
  }
  else if (sectionname == "orderanddisipline") {
    // document.getElementById("discourcesectionname").textContent = "Book Study - Order and Discipline";
    return "Order and Discipline";
  }
  else if (sectionname == "wildernesswandering") {
    // document.getElementById("discourcesectionname").textContent = "Book Study - Wilderness Wandering";
    return "Wilderness Wandering";
  }
  else if (sectionname == "christianconcepts") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Christian Concepts";
    return "Christian Concepts";
  }
  else if (sectionname == "ecclesiaelection") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Ecclesia Election";
    return "Ecclesia Election";
  }
  else if (sectionname == "endtimeprophecy") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - End Time Prophecy";
    return "End Time Prophecy";
  }
  else if (sectionname == "goldenrule") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Golden Rule";
    return "Golden Rule";
  }
  else if (sectionname == "gospelintheheaven") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Gospel in the Heaven";
    return "Gospel in the Heaven";
  }
  else if (sectionname == "israel") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Israel";
    return "Israel";
  }
  else if (sectionname == "pandemic") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Pandemic";
    return "Pandemic";
  }
  else if (sectionname == "parables") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Parables";
    return "Parables";
  }
  else if (sectionname == "perfectingholiness") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Perfecting Holiness";
    return "Perfecting Holiness";
  }
  else if (sectionname == "revelation") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Revelation";
    return "Revelation";
  }
  else if (sectionname == "sin") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Sin";
    return "Sin";
  }
  else if (sectionname == "spiritbegettal") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Spirit Begettal";
    return "Spirit Begettal";
  }
  else if (sectionname == "understandinggreattribulation") {
    // document.getElementById("discourcesectionname").textContent = "Topical Study - Understanding Great Tribulation";
    return "Understanding Great Tribulation";
  }
  else {
    // document.getElementById("discourcesectionname").textContent = searchdata;
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

function sortDiscourses(mode) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let sortedData = [...data];
      if (mode === "alphabet") {
        sortedData.sort((a, b) => a.topic.localeCompare(b.topic));
      } else if (mode === "year") {
        sortedData.sort((a, b) => {
          const yearA = parseInt(a.year || a.topic.match(/\b\d{4}\b/)?.[0]) || 0;
          const yearB = parseInt(b.year || b.topic.match(/\b\d{4}\b/)?.[0]) || 0;
          return yearB - yearA; // descending year
        });
      }

      // Re-render with sorted data
      document.getElementById("titleAudioWidget").innerHTML = ""; // Clear
      renderAudioItems(sortedData); // Call the same render function used earlier
    })
    .catch(error => console.error("Sort error:", error));
}
function filterDiscourses() {
  const keyword = document.getElementById("keywordsearch").value.toLowerCase();
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter(
        (item) =>
          item.topic.toLowerCase().includes(keyword) ||
          (item.tamil && item.tamil.toLowerCase().includes(keyword))
      );
      renderAudioItems(filtered);
    });
}
function renderGridView(data) {
  document.getElementById("grid").innerHTML = "";
  new gridjs.Grid({
    columns: [
      { name: "Topic", width: "25%" },
      { name: "Tamil", width: "30%" },
      { name: "Year", width: "10%" },
      {
        name: "Audio",
        width: "35%",
        formatter: (_, row) => gridjs.html(`<audio controls src="${row.cells[3].data}"></audio>`)
      }
    ],
    data: data.map(item => [
      item.topic || "-",
      item.tamil || "-",
      item.year || "-",
      item.audioUrl || "#"
    ]),
    search: true,
    sort: true,
    pagination: {
      limit: 8
    },
    style: {
      table: {
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'Cardo',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
      },
      th: {
        backgroundColor: '#7a2a2a',
        color: '#e5d8c4',
        textAlign: 'center',
        padding: '10px'
      },
      td: {
        backgroundColor: '#e5d8c4',
        color: '#7a2a2a',
        padding: '10px',
        fontWeight: '500'
      }
    }
  }).render(document.getElementById("grid"));
}

function openNav() {
  document.getElementById("mobileSideNav").classList.add("open");
}

function closeNav() {
  document.getElementById("mobileSideNav").classList.remove("open");
}
function toggleSubmenu(el) {
  const allSubmenus = document.querySelectorAll(".submenu");
  const allItems = document.querySelectorAll(".has-submenu");

  allSubmenus.forEach((submenu) => {
    if (submenu !== el.nextElementSibling) submenu.style.display = "none";
  });

  allItems.forEach((item) => {
    if (item !== el.parentElement) item.classList.remove("active");
  });

  const submenu = el.nextElementSibling;
  const isVisible = submenu.style.display === "block";
  submenu.style.display = isVisible ? "none" : "block";
  el.parentElement.classList.toggle("active", !isVisible);
}
document.addEventListener('play', function (e) {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    if (audio !== e.target) {
      audio.pause();
    }
  });

  const targetAudio = e.target;
  const dataSrc = targetAudio.getAttribute('data-src');

  if (dataSrc && targetAudio.src !== dataSrc) {
    targetAudio.src = dataSrc;
    targetAudio.load();
    targetAudio.play();
  }
}, true);
