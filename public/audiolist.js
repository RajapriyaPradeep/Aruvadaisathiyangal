

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
               name: 'TITLE',  // Change header title for 'Topic' column
               sort: true,
               resizable: true
             },
             {
               name: 'Audio', // Change header title for 'Audio Preview' column
               sort: false,
               resizable: true,
               formatter: (cell) => gridjs.html(`
                 <audio controls style="    height: 30px;border:1px solid #7a2a2a;border-radius:25px;">
                   <source src="${cell}" type="audio/mp3">
                   Your browser does not support the audio element.
                 </audio>`)
             },
             {
              name:gridjs.html('<i style="color:#e5d8c4"  class="fas fa-download icon"></i>'),
               id:'share',
               resizable: true,
               sort:false,
               formatter: (cell, row) => {
                 return gridjs.html(`<a href="${row.cells[2].data}" target="_blank"><i class="fas fa-download icon" ></i></a>`);
               }                
             },
             {
               name:gridjs.html('<i style="color:#e5d8c4"  class="fas fa-file-pdf"></i>'),
               id:'pdf',
               resizable: true,
               sort:false,
               formatter: (cell, row) => {
                 console.log("cell data is " + cell);
                 if(cell  != '')                  
                 return gridjs.html(`<a href="${cell}" target="_blank"><i class="fas fa-file-pdf"></i></a>`);
               else
                 return gridjs.html(``);
               }                
             },
            //  {
            //    name: 'Size',  // Change header title for 'Size (MB)' column
            //    sort: false,
            //    formatter: (cell) => `${cell} MB`
            //  },
             {
               name: 'Year',  // Change header title for 'Timestamp' column
               sort: true
             }
           ],
       data: data.map(item => [
         item.topic,
         item.audioUrl,
         item.audioUrl,
         item.pdflink,
        //  item.sizeMb,
         item.year
       ]),
       sort: true,
       pagination: true
     }).render(document.getElementById("grid"));
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