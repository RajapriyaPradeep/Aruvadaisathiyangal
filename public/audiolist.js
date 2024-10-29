
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
else
   apiUrl = `https://aruvadaisathiyangal.vercel.app/api/videos?search=${encodeURIComponent(searchdata)}`;

fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        // If the response is not OK, throw an error with the status text
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }
      return response.json();  // Parse the response as JSON
    })
    .then(data => {
        new gridjs.Grid({
          width: "100%",
            columns: [
              {
                name: 'TITLE',  // Change header title for 'Topic' column
                sort: true,
                
              },
              {
                name: 'Audio', // Change header title for 'Audio Preview' column
                sort: false,
                formatter: (cell) => gridjs.html(`
                  <audio controls style="    height: 30px;border:1px solid #7a2a2a;border-radius:25px;">
                    <source src="${cell}" type="audio/mp3">
                    Your browser does not support the audio element.
                  </audio>`)
              },
              {
                name:'',
                id:'share',
                sort:false,
                formatter: (cell, row) => {
                  return gridjs.html(`<a href="${row.cells[2].data}" target="_blank"><i class="fas fa-share-alt" ></i></a>`);
                }                
              },
              {
                name:'',
                id:'pdf',
                sort:false,
                formatter: (cell, row) => {
                  console.log("cell data is " + cell);
                  if(cell  != '')                  
                  return gridjs.html(`<a href="${cell}" target="_blank"><i class="fas fa-file-pdf"></i></a>`);
                else
                  return gridjs.html(``);
                }                
              },
              {
                name: 'Size',  // Change header title for 'Size (MB)' column
                sort: false,
                formatter: (cell) => `${cell} MB`
              },
              {
                name: 'Date',  // Change header title for 'Timestamp' column
                sort: true,
                formatter: (cell) => {
                  const date = new Date(cell);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
                  const year = date.getFullYear();
                  return `${day}.${month}.${year}`;
                }
                //formatter: (cell) => new Date(cell).toLocaleString() // Format the timestamp
              }
              // ,
              // {
              //   name: 'Duration',  // Change header title for 'Duration' column
              //   sort: false
              // }
              // {
              //   name: 'PDF',  // Change header title for 'Duration' column
              //   sort: false
              // }
            ],
        data: data.map(item => [
          item.topic,
          item.audioUrl,
          item.audioUrl,
          item.pdflink,
          item.sizeMb,
          item.timestamp
          // item.duration,
          // item.downloadUrl,
        ]),
        sort: true,
        pagination: true
      }).render(document.getElementById("grid"));
    })
    .catch(error => {
      console.error('Error fetching data:', error);  // Log the error in the console
      alert(`An error occurred while fetching the data: ${error.message}`);  // Display an alert with the error message
    });

  // Function to handle sharing
  function shareAudio(url) {
    alert(`Sharing audio: ${url}`);
  }