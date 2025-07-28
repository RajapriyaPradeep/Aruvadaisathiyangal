const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchdata = urlParams.get('module');
const searchkeyword = urlParams.get('srch');
let isMobileView = true;
let apiUrl = "";

const width = window.innerWidth;
let currentView = "card";

window.onload = function () {
    fetchaudiodiscourses();
}

function fetchaudiodiscourses() {

    apiUrl = `https://aruvadaisathiyangal.vercel.app/api/recent`;
    // apiUrl = `http://localhost:5000/api/recent`;

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
            //for mobile version
            const widgetContainer = document.getElementById("titleAudioWidget");

            // Initial render
            buildTimeline(data);
            bindTimelineClicks();
            syncTimelineOnScroll();

        })
        .catch(error => {
            console.error('Error fetching data:', error);  // Log the error in the console
            alert(`An error occurred while fetching the data: ${error.message}`);  // Display an alert with the error message
        });
}
function updatesectiontitle(sectionname) {
    if (sectionname == "recent") {
        return "New";
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

function navplaylist(modulename) {
    if (modulename == "home")
        window.location.href = 'https://aruvadaisathiyangal.in/index.html';
    else if (modulename == "aboutus")
        window.location.href = 'https://aruvadaisathiyangal.in/aboutus.html';
    else if (modulename == "recent")
        window.location.href = 'https://aruvadaisathiyangal.in/recentdiscourses.html';
    else if (modulename == "youtubevideos")
        window.location.href = 'https://aruvadaisathiyangal.in/youtubediscourses.html';
    else
        window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?module=' + modulename;
}

function searchaudio() {
    if (document.getElementById("searchkeyword").value != "") {
        let search_keyword = document.get
        window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?srch=' + document.getElementById("searchkeyword").value;
    }
}

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
            // renderAudioItems(sortedData); // Call the same render function used earlier
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
            // renderAudioItems(filtered);
        });
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
function buildTimeline(data) {
    const datesUl = document.getElementById('dates');
    const issuesUl = document.getElementById('issues');
    datesUl.innerHTML = '';
    issuesUl.innerHTML = '';

    // 1. Group by month & year (e.g., "May 2025")
    const grouped = data.reduce((acc, item) => {
        const key = `${item.month} ${item.year}`;
        (acc[key] = acc[key] || []).push(item);
        return acc;
    }, {});

    // 2. Sort keys chronologically
    const orderedKeys = Object.keys(grouped).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
    });

    // 3. Populate HTML
    orderedKeys.forEach((key, index) => {

        const liDate = document.createElement('li');
        liDate.classList.add('timeline-item');

        // 1) create the FA icon
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle timeline-icon';
        liDate.appendChild(icon);

        // 2) then the month link
        const anchor = document.createElement('a');
        anchor.href = `#month${index}`;
        anchor.textContent = key.split(' ')[0];
        liDate.appendChild(anchor);

        datesUl.appendChild(liDate);


        const liIssue = document.createElement('li');
        liIssue.id = `month${index}`;
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('month-block');

        grouped[key].forEach(item => {
            // const widget = document.createElement('div');
            // widget.className = 'audio-card';

            // widget.innerHTML = `
            //     <h4>${item.topic}</h4>
            //     <p class="card-tamil-content">${item.tamil}</p>
            //     <audio controls preload="none" src="${item.audioUrl}" class="timeline-audio"></audio>
            //     <div class="file-icons">
            //         ${item.pdflink ? `<a href="${item.pdflink}" target="_blank" title="PDF"><i class="fas fa-file-pdf"></i></a>` : ''}
            //         ${item.pptlink ? `<a href="${item.pptlink}" target="_blank" title="PPT"><i class="fas fa-file-powerpoint"></i></a>` : ''}
            //         <a href="${item.audioUrl}" target="_blank" title="Download"><i class="fas fa-download"></i></a>
            //     </div>
            // `;
            const card = document.createElement("div");
            card.className = "audio-card";



            // Top circle image (overlapping)
            let circleIcon = null;

            //             if (currentView === "card") {
            //                 circleIcon = document.createElement("div");
            //                 circleIcon.className = "circle-icon";
            //                 circleIcon.innerHTML = `
            //     <img src="${item.imageUrl || './Assets/audioimages/recent.png'}" 
            //          alt="Badge Icon" class="circle-img" />
            //   `;
            //             }

            //             if (circleIcon) {
            //                 card.appendChild(circleIcon);
            //             }
            // Year badge on top-right corner
            if (currentView === "card" && item.year) {
                let sect_name = ""
                if (item.section == "basicstudies")
                    sect_name = "Basics"
                else if (item.section == "wildernesswandering")
                    sect_name = "Wilderness Wandering"
                else if (item.section == "spiritbegettal")
                    sect_name = "Spirit Begettal"
                else if (item.section == "revelation")
                    sect_name = "Revelation"
                else if (item.section == "sin")
                    sect_name = "Sin"
                else if (item.section == "understandinggreattribulation")
                    sect_name = "Great Tribulation"
                else if (item.section == "christianconcepts")
                    sect_name = "Christian Concepts"
                else if (item.section == "kingdommessage")
                    sect_name = "Kingdom Message"
                else if (item.section == "characterdevelopment")
                    sect_name = "Character Development"
                else if (item.section == "spiritual")
                    sect_name = "Spiritual"
                else if (item.section == "ecclesiaelection")
                    sect_name = "Ecclesia Election"
                else if (item.section == "goldenrule")
                    sect_name = "Golden Rule"
                else if (item.section == "gospelintheheaven")
                    sect_name = "Gospel In The Heaven"
                else if (item.section == "israel")
                    sect_name = "Israel"
                else if (item.section == "lifeofdavid")
                    sect_name = "Life of David"
                else if (item.section == "orderanddisipline")
                    sect_name = "Order and Disipline"
                else if (item.section == "pandemic")
                    sect_name = "Pandemic"
                else if (item.section == "lifeofjesuschrist")
                    sect_name = "Life of Christ"
                else if (item.section == "endtimeprophecy")
                    sect_name = "End Time Prophecy"
                else if (item.section == "ot")
                    sect_name = "Old Testament"
                else if (item.section == "prophetic")
                    sect_name = "Prophetic"
                else if (item.section == "thebattleofarmageddon")
                    sect_name = "Battle of Armageddon"
                else if (item.section == "memorial")
                    sect_name = "Memorial"
                else if (item.section == "thenewcreation")
                    sect_name = "New Creation"
                else if (item.section == "vesperservice")
                    sect_name = "Vesper Service"
                else if (item.section == "qanda")
                    sect_name = "Q & A"
                else if (item.section == "bookofromans")
                    sect_name = "Book of Romans"

                const sourcebadge = document.createElement("div");
                sourcebadge.className = "source-badge";
                sourcebadge.innerHTML = `<span class="badge year">${sect_name}</span>`;
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
            // Audio player container
            const audioPlayer = document.createElement("div");
            audioPlayer.className = "audio-player";
            audioPlayer.innerHTML = `
  <audio controls preload="none" src="data:audio/mp3;base64,//uQxAALAAAADQAAAANAAACAAACAgACAAAAAQACAgICAwMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgoLCwsMD...
" data-src="${item.audioUrl}">
  Your browser does not support the audio element.
  </audio>
`;
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
            sectionDiv.appendChild(card);
            // sectionDiv.appendChild(widget);
        });

        liIssue.appendChild(sectionDiv);
        issuesUl.appendChild(liIssue);
    });
}


function initTimeline() {
    const orient = window.innerWidth <= 768 ? 'horizontal' : 'vertical';
    $().timelinr({
        orientation: orient,
        issuesSpeed: 300,
        datesSpeed: 100,
        arrowKeys: true,
        startAt: 0
    });
}
function bindTimelineClicks() {
    document.querySelectorAll('#dates a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();                            // cancel the default page jump
            const targetId = link.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            const container = document.getElementById('main-content');

            // scroll the RIGHT pane, not the window:
            container.scrollTo({
                top: targetEl.offsetTop - container.offsetTop,
                behavior: 'smooth'
            });

            // update “selected” styling
            document.querySelectorAll('#dates a.selected')
                .forEach(a => a.classList.remove('selected'));
            link.classList.add('selected');
        });
    });
}
function syncTimelineOnScroll() {
    const container = document.getElementById('main-content');
    const months = Array.from(document.querySelectorAll('#issues > li'));
    const links = Array.from(document.querySelectorAll('#dates a'));

    container.addEventListener('scroll', () => {
        const topY = container.getBoundingClientRect().top;
        // find which month-block is closest to the top of the viewport
        const distances = months.map(el =>
            Math.abs(el.getBoundingClientRect().top - topY)
        );
        const idx = distances.indexOf(Math.min(...distances));
        // update selected class
        links.forEach(a => a.classList.remove('selected'));
        links[idx]?.classList.add('selected');
    });
}