

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let isMobileView = true;
let apiUrl = "";

const width = window.innerWidth;

window.onload = function () {
  // debugger
  if (width <= 480 && ((localStorage.getItem("viewmode") == null) || localStorage.getItem("viewmode") == undefined)) {
    localStorage.setItem("viewmode", "mobile");
  }
  if (width <= 480) {

  }
  else {
    document.getElementById("devicemode").style.display = "none";
  }
  fetchaudiodiscourses();
}
// const search = 'Technology';
// const apiUrl = 'http://localhost:5000/api/defaultvideos';
//const apiUrl = 'http://localhost:5000/api/videos?search=' + searchdata;


function fetchaudiodiscourses() {
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
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const width = window.innerWidth;

      if (width <= 480 && (localStorage.getItem("viewmode") == "mobile")) {
        document.getElementById("grid").style.display = "none";
        document.getElementById("titleAudioWidget").style.display = "block";

        // For mobile version
        const widgetContainer = document.getElementById("titleAudioWidget");

        function renderAudioItems(filteredData) {
          widgetContainer.innerHTML = ""; // Clear existing items

          if (filteredData.length === 0) {
            const noRecordsMessage = document.createElement("div");
            noRecordsMessage.className = "noRecordsMessage";
            noRecordsMessage.textContent = "No records available";
            widgetContainer.appendChild(noRecordsMessage);
            return;
          }

          filteredData.forEach(item => {
            const audioItem = document.createElement("div");
            const titleContainer = document.createElement("div");
            titleContainer.className = "titleContainermobile";

            const titleDiv = document.createElement("div");
            titleDiv.className = "audioTitle";
            titleDiv.textContent = item.topic;

            // Tooltip functionality
            let tooltip;
            const showTooltip = () => {
              if (!tooltip) {
                tooltip = document.createElement("div");
                tooltip.classList.add("custom-tooltip");
                tooltip.innerText = item.tamil;
                document.body.appendChild(tooltip);
              }

              const rect = titleDiv.getBoundingClientRect();
              let tooltipLeft = rect.left + window.scrollX;
              let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5;
              const viewportWidth = window.innerWidth;
              const viewportHeight = window.innerHeight;
              const tooltipMargin = 10;

              if (tooltipLeft < tooltipMargin) tooltipLeft = tooltipMargin;
              if (tooltipLeft + tooltip.offsetWidth > viewportWidth - tooltipMargin)
                tooltipLeft = viewportWidth - tooltip.offsetWidth - tooltipMargin;
              if (tooltipTop < tooltipMargin)
                tooltipTop = rect.top + window.scrollY + rect.height + 5;
              if (tooltipTop + tooltip.offsetHeight > viewportHeight - tooltipMargin)
                tooltipTop = viewportHeight - tooltip.offsetHeight - tooltipMargin;

              tooltip.style.position = "absolute";
              tooltip.style.left = `${tooltipLeft}px`;
              tooltip.style.top = `${tooltipTop}px`;
              tooltip.style.backgroundColor = "#7a2a2a";
              tooltip.style.color = "#f9f9f9";
              tooltip.style.padding = "5px 10px";
              tooltip.style.borderRadius = "5px";
              tooltip.style.fontSize = "12px";
              tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
            };

            const hideTooltip = () => {
              if (tooltip && tooltip.parentElement) {
                tooltip.parentElement.removeChild(tooltip);
                tooltip = null;
              }
            };

            titleDiv.addEventListener("mouseover", showTooltip);
            titleDiv.addEventListener("mouseleave", hideTooltip);
            titleDiv.addEventListener("click", showTooltip);

            titleContainer.appendChild(titleDiv);

            // Add icons for PDF, download, and PPT
            if (item.pdflink) {
              const shareIcon = document.createElement("i");
              shareIcon.className = "fas fa-file-pdf icon mobileicon";
              shareIcon.title = "Pdf";
              shareIcon.addEventListener("click", () => {
                window.open(item.pdflink, "_blank");
              });
              titleContainer.appendChild(shareIcon);
            }

            const downloadIcon = document.createElement("i");
            downloadIcon.className = "fas fa-download icon mobileicon";
            downloadIcon.title = "Download";
            downloadIcon.addEventListener("click", () => {
              window.open(item.audioUrl, "_blank");
            });
            titleContainer.appendChild(downloadIcon);

            if (item.pptlink) {
              const pptIcon = document.createElement("i");
              pptIcon.className = "fas fa-file-pdf icon mobileicon";
              pptIcon.title = "PPT";
              pptIcon.addEventListener("click", () => {
                window.open(item.pptlink, "_blank");
              });
              titleContainer.appendChild(pptIcon);
            }

            // Audio control
            const audioControl = document.createElement("audio");
            audioControl.className = "audioControl audioControlmobile";
            audioControl.controls = true;
            const source = document.createElement("source");
            source.src = item.audioUrl;
            source.type = "audio/mp3";
            audioControl.appendChild(source);

            audioItem.appendChild(titleContainer);
            audioItem.appendChild(audioControl);
            widgetContainer.appendChild(audioItem);
          });
        }

        renderAudioItems(data);
      } else {
        document.getElementById("titleAudioWidget").style.display = "none";
        document.getElementById("grid").style.display = "block";

        // Clear the grid before re-rendering
        const gridContainer = document.getElementById("grid");
        gridContainer.innerHTML = ""; // Clear the grid container

        // Initialize Grid.js with new data
        new gridjs.Grid({
          search: true,
          width: "100%",
          columns: [
            {
              name: updatesectiontitle(searchdata),
              sort: true,
              resizable: true,
              formatter: (cell, row) => {
                const title = cell.topic;
                const audioUrl = row.cells[1].data;
                const pdfLink = cell.pdflink;
                const pptlink = cell.pptlink;
                const tamil = cell.tamil;

                return gridjs.html(`
                  <span class="tooltip-target" data-tooltip="${tamil}">${title}</span>
                  <a href="${audioUrl}" target="_blank" style="margin-left: 8px;">
                    <i class="fas fa-download icon" style="color:#7a2a2a;" title="Download Audio"></i>
                  </a>
                  ${pdfLink ? `<a href="${pdfLink}" target="_blank" style="margin-left: 8px;">
                    <i class="fas fa-file-pdf icon" style="color:#7a2a2a;" title="Download PDF"></i>
                  </a>` : ''}
                  ${pptlink ? `<a href="${pptlink}" target="_blank" style="margin-left: 8px;">
                    <i class="fas fa-file-powerpoint icon" style="color:#7a2a2a;" title="Download PPT"></i>
                  </a>` : ''}
                `);
              }
            },
            {
              name: 'AUDIO',
              sort: false,
              resizable: true,
              formatter: (cell) => gridjs.html(`
                <audio controls style="height: 30px; border:1px solid #7a2a2a; border-radius:25px;">
                  <source src="${cell}" type="audio/mp3">
                  Your browser does not support the audio element.
                </audio>`)
            },
            {
              name: 'YEAR',
              sort: true
            }
          ],
          data: data.map(item => [
            { topic: item.topic, pdflink: item.pdflink, pptlink: item.pptlink, tamil: item.tamil },
            item.audioUrl,
            item.year
          ]),
          sort: true,
          pagination: true
        }).render(gridContainer);
      }

      updatesectiontitle(searchdata);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert(`An error occurred while fetching the data: ${error.message}`);
    });
}

function toggleViewMode() {
  isMobileView = !isMobileView;

  if (isMobileView) {
    localStorage.setItem("viewmode", "mobile");
    document.getElementById("devicemode").innerHTML = "💻";
  }
  else {
    localStorage.setItem("viewmode", "desktop");
    document.getElementById("devicemode").innerHTML = "📱";
  }
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
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - BASICS 53";
    return "DISCOURCES - BASICS 53";
  }
  else if (sectionname == "kingdommessage") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - KINGDOM MESSAGE";
    return "DISCOURCES - KINGDOM MESSAGE";
  }
  else if (sectionname == "characterdevelopment") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - CHARACTER DEVELOPMENT";
    return "DISCOURCES - CHARACTER DEVELOPMENT";
  }
  else if (sectionname == "memorial") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - MEMORIAL";
    return "DISCOURCES - MEMORIAL";
  }
  else if (sectionname == "prophetic") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - PROPHETIC";
    return "DISCOURCES - PROPHETIC";
  }
  else if (sectionname == "spiritual") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - SPIRITUAL";
    return "DISCOURCES - SPIRITUAL";
  }
  else if (sectionname == "typeantitype") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - TYPE AND ANTITYPE";
    return "DISCOURCES - TYPE AND ANTITYPE";
  }
  else if (sectionname == "paneldiscussions") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - PANEL DISCUSSIONS";
    return "DISCOURCES - PANEL DISCUSSIONS";
  }
  else if (sectionname == "testimonial") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - TESTIMONAL";
    return "DISCOURCES - TESTIMONAL";
  }
  else if (sectionname == "vesperservice") {
    document.getElementById("discourcesectionname").textContent = "DISCOURCES - VESPER SERVICE";
    return "DISCOURCES - VESPER SERVICE";
  }
  else if (sectionname == "thebattleofarmageddon") {
    document.getElementById("discourcesectionname").textContent = "VOLUME STUDY 4 - THE BATTLE OF ARMAGEDDON";
    return "VOLUME STUDY 4 - THE BATTLE OF ARMAGEDDON";
  }
  else if (sectionname == "thenewcreation") {
    document.getElementById("discourcesectionname").textContent = "VOLUME STUDY 6 - THE NEW CREATION";
    return "VOLUME STUDY 6 - THE NEW CREATION";
  }
  else if (sectionname == "lifeofjesuschrist") {
    document.getElementById("discourcesectionname").textContent = "BOOK STUDY - LIFE OF JESUS CHRIST";
    return "BOOK STUDY - LIFE OF JESUS CHRIST";
  }
  else if (sectionname == "lifeofdavid") {
    document.getElementById("discourcesectionname").textContent = "BOOK STUDY - LIFE OF DAVID";
    return "BOOK STUDY - LIFE OF DAVID";
  }
  else if (sectionname == "orderanddisipline") {
    document.getElementById("discourcesectionname").textContent = "BOOK STUDY - ORDER AND DISCIPLINE";
    return "BOOK STUDY - ORDER AND DISCIPLINE";
  }
  else if (sectionname == "wildernesswandering") {
    document.getElementById("discourcesectionname").textContent = "BOOK STUDY - WILDERNESS WANDERING";
    return "BOOK STUDY - WILDERNESS WANDERING";
  }
  else if (sectionname == "christianconcepts") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - CHRISTIAN CONCEPTS";
    return "TOPICAL STUDY - CHRISTIAN CONCEPTS";
  }
  else if (sectionname == "ecclesiaelection") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - ECCLESIA ELECTION";
    return "TOPICAL STUDY - ECCLESIA ELECTION";
  }
  else if (sectionname == "endtimeprophecy") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - END TIME PROPHECY";
    return "TOPICAL STUDY - END TIME PROPHECY";
  }
  else if (sectionname == "goldenrule") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - GOLDEN RULE";
    return "TOPICAL STUDY - GOLDEN RULE";
  }
  else if (sectionname == "gospelintheheaven") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - GOSPEL IN THE HEAVEN";
    return "TOPICAL STUDY - GOSPEL IN THE HEAVEN";
  }
  else if (sectionname == "israel") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - ISRAEL";
    return "TOPICAL STUDY - ISRAEL";
  }
  else if (sectionname == "pandemic") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - PANDEMIC";
    return "TOPICAL STUDY - PANDEMIC";
  }
  else if (sectionname == "parables") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - PARABLES";
    return "TOPICAL STUDY - PARABLES";
  }
  else if (sectionname == "perfectingholiness") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - PERFECTING HOLINESS";
    return "TOPICAL STUDY - PERFECTING HOLINESS";
  }
  else if (sectionname == "revelation") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - REVELATION";
    return "TOPICAL STUDY - REVELATION";
  }
  else if (sectionname == "sin") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - SIN";
    return "TOPICAL STUDY - SIN";
  }
  else if (sectionname == "spiritbegettal") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - SPIRIT BEGETTAL";
    return "TOPICAL STUDY - SPIRIT BEGETTAL";
  }
  else if (sectionname == "understandinggreattribulation") {
    document.getElementById("discourcesectionname").textContent = "TOPICAL STUDY - UNDERSTANDING GREAT TRIBULATION";
    return "TOPICAL STUDY - UNDERSTANDING GREAT TRIBULATION";
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

