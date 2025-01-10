

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let apiUrl = "";
// const search = 'Technology';
// const apiUrl = 'http://localhost:5000/api/defaultvideos';
//const apiUrl = 'http://localhost:5000/api/videos?search=' + searchdata;

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
    debugger
    const width = window.innerWidth;

    if (width <= 480 && (localStorage.getItem("viewmode") == "mobile")) {
      document.getElementById("grid").style.display = "none";
      document.getElementById("titleAudioWidget").style.display = "block";
      //for mobile version
      const widgetContainer = document.getElementById("titleAudioWidget");
      // Function to render audio items
      function renderAudioItems(filteredData) {
        widgetContainer.innerHTML = ""; // Clear existing items

        // Check if there are no records to display
        if (filteredData.length === 0) {
          const noRecordsMessage = document.createElement("div");
          noRecordsMessage.className = "noRecordsMessage";
          noRecordsMessage.textContent = "No records available";
          widgetContainer.appendChild(noRecordsMessage);
          return; // Exit the function if no records to display
        }

        filteredData.forEach(item => {
          const audioItem = document.createElement("div");
          //  audioItem.className = "audioItem";

          // Title container with icons
          const titleContainer = document.createElement("div");
          titleContainer.className = "titleContainermobile";

          //  // Title text
          //  const titleDiv = document.createElement("div");
          //  titleDiv.className = "audioTitle";
          //  titleDiv.textContent = item.topic;

          // Title text with custom tooltip
          const titleDiv = document.createElement("div");
          titleDiv.className = "audioTitle";
          titleDiv.textContent = item.topic;

          // Tooltip element
          let tooltip;
          // Function to show the tooltip
          const showTooltip = () => {
            if (!tooltip) {
              tooltip = document.createElement("div");
              tooltip.classList.add("custom-tooltip");
              tooltip.innerText = item.tamil;
              document.body.appendChild(tooltip);
            }

            // Get position of titleDiv relative to viewport
            const rect = titleDiv.getBoundingClientRect();
            let tooltipLeft = rect.left + window.scrollX;
            let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5;

            // Adjust position to ensure tooltip stays in viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const tooltipMargin = 10;

            if (tooltipLeft < tooltipMargin) {
              tooltipLeft = tooltipMargin;
            }
            if (tooltipLeft + tooltip.offsetWidth > viewportWidth - tooltipMargin) {
              tooltipLeft = viewportWidth - tooltip.offsetWidth - tooltipMargin;
            }
            if (tooltipTop < tooltipMargin) {
              tooltipTop = rect.top + window.scrollY + rect.height + 5;
            }
            if (tooltipTop + tooltip.offsetHeight > viewportHeight - tooltipMargin) {
              tooltipTop = viewportHeight - tooltip.offsetHeight - tooltipMargin;
            }

            // Set tooltip position and styles
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

          // Function to hide the tooltip
          const hideTooltip = () => {
            if (tooltip && tooltip.parentElement) {
              tooltip.parentElement.removeChild(tooltip);
              tooltip = null;
            }
          };

          // Show tooltip on hover for desktop
          titleDiv.addEventListener("mouseover", showTooltip);
          titleDiv.addEventListener("mouseleave", hideTooltip);

          // Show tooltip on click for mobile
          titleDiv.addEventListener("click", showTooltip);

          // Append title and icons to the title container
          titleContainer.appendChild(titleDiv);

          // Share icon (PDF link)
          if (item.pdflink) {
            const shareIcon = document.createElement("i");
            shareIcon.className = "fas fa-file-pdf icon mobileicon";
            shareIcon.title = "Pdf";
            shareIcon.addEventListener("click", () => {
              window.open(item.pdflink, "_blank");
            });
            titleContainer.appendChild(shareIcon);
          }


          // Download icon
          const downloadIcon = document.createElement("i");
          downloadIcon.className = "fas fa-download icon mobileicon";
          downloadIcon.title = "Download";
          downloadIcon.addEventListener("click", () => {
            window.open(item.audioUrl, "_blank");
          });
          titleContainer.appendChild(downloadIcon);


          // Share icon (PPT link)
          if (item.pptlink) {
            const pptIcon = document.createElement("i");
            pptIcon.className = "fas fa-file-pdf icon mobileicon";
            // <i class="fa-solid fa-file-powerpoint"></i>
            pptIcon.title = "PPT";
            pptIcon.addEventListener("click", () => {
              window.open(item.pdflink, "_blank");
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

          // Append titleContainer and audio control to audio item
          audioItem.appendChild(titleContainer);
          audioItem.appendChild(audioControl);

          widgetContainer.appendChild(audioItem);
        });
      }

      // Initial render
      renderAudioItems(data);
    }
    else {
      debugger;
      document.getElementById("titleAudioWidget").style.display = "none";
      document.getElementById("grid").style.display = "block";
      new gridjs.Grid({
        width: "100%",
        columns: [
          {
            name: 'TITLE', // Column title
            sort: true,
            resizable: true,
            formatter: (cell, row) => {
              debugger
              const title = cell.topic;
              const audioUrl = row.cells[1].data; // Audio download link
              // const pdfLink = row.cells[3].data;   // PDF link
              const pdfLink = cell.pdflink;
              const pptlink = cell.pptlink;
              const tamil = cell.tamil;

              // Set up the HTML for title with conditional PDF link
              return gridjs.html(`
              <span class="tooltip-target" data-tooltip="${tamil}">${title}</span>
              <a href="${audioUrl}" target="_blank" style="margin-left: 8px;">
                <i class="fas fa-download icon" style="color:#7a2a2a;" title="Download Audio"></i>
              </a>
              ${pdfLink && pdfLink.trim() ? `<a href="${pdfLink}" target="_blank" style="margin-left: 8px;">
                <i class="fas fa-file-pdf icon" style="color:#7a2a2a;" title="Download PDF"></i>
              </a>` : ''}
              ${pptlink && pptlink.trim() ? `<a href="${pptlink}" target="_blank" style="margin-left: 8px;">
                <i class="fas fa-file-powerpoint icon" style="color:#7a2a2a;" title="Download PPT"></i>
              </a>` : ''}
            `);
              //       return gridjs.html(`
              //         <span class="tooltip-target" data-tooltip="${tamil}">${title}</span>
              //         <a href="${audioUrl}" target="_blank" style="margin-left: 8px;">
              //           <i class="fas fa-download icon" style="color:#7a2a2a;" title="Download Audio"></i>
              //         </a>
              //         ${pdfLink && pdfLink.trim() ? `<a href="${pdfLink}" target="_blank" style="margin-left: 8px;">
              //   <i class="fas fa-file-pdf icon" style="color:#7a2a2a;" title="Download PDF"></i>
              // </a>` : ''}
              //       `);
            }
          },
          {
            name: 'Audio', // Change header title for 'Audio Preview' column
            sort: false,
            resizable: true,
            formatter: (cell) => gridjs.html(`
            <audio controls style="height: 30px; border:1px solid #7a2a2a; border-radius:25px;">
              <source src="${cell}" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>`)
          },
          {
            name: 'Year',  // Change header title for 'Timestamp' column
            sort: true
          }
        ],
        data: data.map(item => [
          { topic: item.topic, pdflink: item.pdflink, pptlink: item.pptlink, tamil: item.tamil }, // Data object for TITLE with `pdflink`
          // item.topic,
          item.audioUrl,
          item.year
          // item.pdflink  // We keep the `pdflink` data here but don’t display it as a separate column
        ]),
        sort: true,
        pagination: true
      }).render(document.getElementById("grid"));
      // Custom tooltip functionality
      document.addEventListener("mouseover", function (event) {
        if (event.target && event.target.classList.contains("tooltip-target")) {
          let tooltipText = event.target.getAttribute("data-tooltip");
          let tooltip = document.createElement("div");
          tooltip.classList.add("custom-tooltip");
          tooltip.innerText = tooltipText;
          document.body.appendChild(tooltip);

          // Get the position of the target element relative to the viewport
          let rect = event.target.getBoundingClientRect();

          // Calculate tooltip position (position it above or below the title)
          let tooltipLeft = rect.left + window.scrollX;
          let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5; // Position above the title (adjust by 5px)

          // Ensure tooltip stays within the viewport (especially on mobile)
          const tooltipMargin = 10; // Margin from the edge of the viewport
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // If the tooltip goes off the left edge, move it to the right
          if (tooltipLeft < tooltipMargin) {
            tooltipLeft = tooltipMargin;
          }

          // If the tooltip goes off the right edge, move it to the left
          if (tooltipLeft + tooltip.offsetWidth > viewportWidth - tooltipMargin) {
            tooltipLeft = viewportWidth - tooltip.offsetWidth - tooltipMargin;
          }

          // If the tooltip goes off the top, move it below the title
          if (tooltipTop < tooltipMargin) {
            tooltipTop = rect.top + window.scrollY + rect.height + 5; // Place below the title
          }

          // If the tooltip goes off the bottom, move it up
          if (tooltipTop + tooltip.offsetHeight > viewportHeight - tooltipMargin) {
            tooltipTop = viewportHeight - tooltip.offsetHeight - tooltipMargin; // Position at the bottom of the screen
          }

          // Set tooltip position
          tooltip.style.position = "absolute";
          tooltip.style.left = `${tooltipLeft}px`;
          tooltip.style.top = `${tooltipTop}px`;

          // Set custom styling for the tooltip
          tooltip.style.backgroundColor = "#7a2a2a";
          tooltip.style.color = "#f9f9f9";
          tooltip.style.padding = "5px 10px";
          tooltip.style.borderRadius = "5px";
          tooltip.style.fontSize = "12px";
          tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";

          // Hide tooltip when mouse leaves the title
          function hideTooltip() {
            if (tooltip && tooltip.parentElement) {
              tooltip.parentElement.removeChild(tooltip);
            }
          }

          event.target.addEventListener("mouseleave", hideTooltip);

          // Optional: auto-remove tooltip after 2 seconds
          setTimeout(hideTooltip, 2000);
        }
      });

      // Handle mobile tap tooltip behavior (optional)
      document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("tooltip-target")) {
          let tooltipText = event.target.getAttribute("data-tooltip");
          let tooltip = document.createElement("div");
          tooltip.classList.add("custom-tooltip");
          tooltip.innerText = tooltipText;
          document.body.appendChild(tooltip);

          // Get the position of the target element
          let rect = event.target.getBoundingClientRect();
          let tooltipLeft = rect.left + window.scrollX;
          let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5;

          // Ensure tooltip stays within the viewport
          const tooltipMargin = 10;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          if (tooltipLeft < tooltipMargin) {
            tooltipLeft = tooltipMargin;
          }

          if (tooltipLeft + tooltip.offsetWidth > viewportWidth - tooltipMargin) {
            tooltipLeft = viewportWidth - tooltip.offsetWidth - tooltipMargin;
          }

          if (tooltipTop < tooltipMargin) {
            tooltipTop = rect.top + window.scrollY + rect.height + 5;
          }

          if (tooltipTop + tooltip.offsetHeight > viewportHeight - tooltipMargin) {
            tooltipTop = viewportHeight - tooltip.offsetHeight - tooltipMargin;
          }

          tooltip.style.position = "absolute";
          tooltip.style.left = `${tooltipLeft}px`;
          tooltip.style.top = `${tooltipTop}px`;

          // Set custom styling for the tooltip
          tooltip.style.backgroundColor = "#7a2a2a";
          tooltip.style.color = "#f9f9f9";
          tooltip.style.padding = "5px 10px";
          tooltip.style.borderRadius = "5px";
          tooltip.style.fontSize = "12px";
          tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";

          // Auto-hide tooltip after 2 seconds
          setTimeout(() => {
            if (tooltip && tooltip.parentElement) {
              tooltip.parentElement.removeChild(tooltip);
            }
          }, 2000); // Tooltip will disappear after 2 seconds
        }
      });

    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);  // Log the error in the console
    alert(`An error occurred while fetching the data: ${error.message}`);  // Display an alert with the error message
  });

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

