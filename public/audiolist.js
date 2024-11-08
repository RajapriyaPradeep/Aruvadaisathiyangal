

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let apiUrl = "";
// const search = 'Technology';
// const apiUrl = 'http://localhost:5000/api/defaultvideos';
//const apiUrl = 'http://localhost:5000/api/videos?search=' + searchdata;

if(searchdata == "" || searchdata == null || searchdata == undefined)
   apiUrl = `https://aruvadaisathiyangal.vercel.app/api/searchkeywordaudios?search=${encodeURIComponent(searchkeyword)}`;
else{
  if(searchdata == "recent")
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

     if (width <= 480 && (localStorage.getItem("viewmode")=="mobile")) {
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
         audioItem.className = "audioItem";
 
         // Title container with icons
         const titleContainer = document.createElement("div");
         titleContainer.className = "titleContainer";
 
         // Title text
         const titleDiv = document.createElement("div");
         titleDiv.className = "audioTitle";
         titleDiv.textContent = item.topic;
 
         // Share icon
         let shareIcon;
         if(item.pdflink)
{
  shareIcon = document.createElement("i");
  shareIcon.className = "fas fa-file-pdf icon";
  shareIcon.title = "Pdf";
  shareIcon.addEventListener("click", () => {
    window.open(item.pdflink, "_blank");  
    // alert(`Sharing ${item.topic}`);
      
  });
       } 
         // Download icon
         const downloadIcon = document.createElement("i");
         downloadIcon.className = "fas fa-download icon";
         downloadIcon.title = "Download";
         downloadIcon.addEventListener("click", () => {
             window.open(item.audioUrl, "_blank");
         });
 
         // Append title and icons to the title container
         titleContainer.appendChild(titleDiv);
         if(item.pdflink)
           {
         titleContainer.appendChild(shareIcon);
           }
         titleContainer.appendChild(downloadIcon);
 
         // Audio control
         const audioControl = document.createElement("audio");
         audioControl.className = "audioControl";
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
   else{
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
            const title = cell;
            const audioUrl = row.cells[1].data; // Audio download link
            const pdfLink = row.cells[2].data;   // PDF link
    
            // Set up the HTML for the title with a tooltip
            return gridjs.html(`
              <span class="tooltip-target" data-tooltip="${title}">${title}</span>
              <a href="${audioUrl}" target="_blank" style="margin-left: 8px;">
                <i class="fas fa-download icon" style="color:#7a2a2a;" title="Download Audio"></i>
              </a>
              ${pdfLink ? `<a href="${pdfLink}" target="_blank" style="margin-left: 8px;">
                <i class="fas fa-file-pdf icon" style="color:#e5d8c4;" title="Download PDF"></i>
              </a>` : ''}
            `);
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
        item.topic,
        item.audioUrl,
        item.year,
        item.pdflink  // We keep the `pdflink` data here but don’t display it as a separate column
      ]),
      sort: true,
      pagination: true
    }).render(document.getElementById("grid"));
    // Custom tooltip functionality
document.addEventListener("mouseover", function(event) {
  if (event.target && event.target.classList.contains("tooltip-target")) {
    let tooltipText = event.target.getAttribute("data-tooltip");
    let tooltip = document.createElement("div");
    tooltip.classList.add("custom-tooltip");
    tooltip.innerText = tooltipText;
    document.body.appendChild(tooltip);

    // Get the position of the target element
    let rect = event.target.getBoundingClientRect();

    // Calculate the position for the tooltip
    let tooltipLeft = rect.left + window.scrollX;
    let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5; // 5px above the title

    // Ensure tooltip is within the viewport (adjust position if it goes off the screen)
    const tooltipMargin = 10; // Margin from the edge of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // If the tooltip goes out of the viewport on the left side, adjust it
    if (tooltipLeft < tooltipMargin) {
      tooltipLeft = tooltipMargin;
    }

    // If the tooltip goes out of the viewport on the right side, adjust it
    if (tooltipLeft + tooltip.offsetWidth > viewportWidth - tooltipMargin) {
      tooltipLeft = viewportWidth - tooltip.offsetWidth - tooltipMargin;
    }

    // If the tooltip goes out of the viewport on the top side, adjust it
    if (tooltipTop < tooltipMargin) {
      tooltipTop = rect.top + window.scrollY + rect.height + 5; // Place below the title if it goes above
    }

    // If the tooltip goes out of the viewport on the bottom side, adjust it
    if (tooltipTop + tooltip.offsetHeight > viewportHeight - tooltipMargin) {
      tooltipTop = viewportHeight - tooltip.offsetHeight - tooltipMargin; // Place at the bottom of the viewport
    }

    // Set the tooltip position
    tooltip.style.left = `${tooltipLeft}px`;
    tooltip.style.top = `${tooltipTop}px`;

    // Remove the tooltip when mouse leaves
    event.target.addEventListener("mouseleave", function() {
      if (tooltip.parentNode) { // Check if tooltip is still a child of body
        document.body.removeChild(tooltip);
      }
    });
  }
});

// Handle mobile tap tooltip behavior (optional)
document.addEventListener("click", function(event) {
  if (event.target && event.target.classList.contains("tooltip-target")) {
    let tooltipText = event.target.getAttribute("data-tooltip");
    let tooltip = document.createElement("div");
    tooltip.classList.add("custom-tooltip");
    tooltip.innerText = tooltipText;
    document.body.appendChild(tooltip);

    let rect = event.target.getBoundingClientRect();
    let tooltipLeft = rect.left + window.scrollX;
    let tooltipTop = rect.top + window.scrollY - tooltip.offsetHeight - 5;

    // Adjust tooltip position to fit within the viewport
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

    tooltip.style.left = `${tooltipLeft}px`;
    tooltip.style.top = `${tooltipTop}px`;

    // Automatically remove tooltip after a short delay (2 seconds)
    setTimeout(() => {
      if (tooltip.parentNode) {
        document.body.removeChild(tooltip);
      }
    }, 2000);
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
  function searchaudio(){
    if(document.getElementById("searchkeyword").value != ""){
    let search_keyword = document.get
    window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?srch=' + document.getElementById("searchkeyword").value;
    }
}
