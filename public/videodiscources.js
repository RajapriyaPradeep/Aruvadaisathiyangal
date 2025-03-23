// List of YouTube video IDs to display
function loadVideoThumbnails() {
    const container = document.getElementById('youtubediscourcescontainer');

    // Group videos by section
    const sections = videoimgpair.reduce((acc, video) => {
        if (!acc[video.section]) {
            acc[video.section] = [];
        }
        acc[video.section].push(video);
        return acc;
    }, {});

    // Create section elements
    for (const [sectionName, videos] of Object.entries(sections)) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'video-section';

        // Create section header
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h2>${sectionName}</h2>
            <span class="chevron">▼</span>
        `;

        // Create content container
        const content = document.createElement('div');
        content.className = 'section-content';
        content.style.display = 'none';

        // Populate content with videos
        videos.forEach(id => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'video-item';
            videoDiv.innerHTML = `
                <img src="./Assets/Videothumbnail/${id.imgid}" 
                     alt="${id.title}" 
                     class="video-thumbnail"
                     onclick="openPopup('${id.videoid}')">
                <label class="video-title">${id.title}</label>
            `;
            content.appendChild(videoDiv);
        });

        // Toggle visibility
        header.addEventListener('click', () => {
            const isHidden = content.style.display === 'none';
            content.style.display = isHidden ? 'grid' : 'none';
            header.querySelector('.chevron').style.transform =
                isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        sectionDiv.appendChild(header);
        sectionDiv.appendChild(content);
        container.appendChild(sectionDiv);
    }
}

// Keep the rest of your existing code (openPopup, closePopup, etc.)
const videoimgpair = [
    { imgid: 'troublescomfort.png', section: "Memorial Studies", title: "Troubles and Comfort", videoid: 'ximF0endJnw?si=vAGlC1uHOnsO6z4i' },
    { imgid: 'thewordmadeflesh.png', section: "Memorial Studies", title: "The word was made flesh", videoid: 'Ni7bOEQVsZc?si=Rcstg00vt4C3EvnP' },
    { imgid: 'hourofdarkness.png', section: "Memorial Studies", title: "39 hours of darkness", videoid: 'EXHZh9-HdCo?si=4kGpVPuUetev6bd2' },
    { imgid: 'proper.png', section: "Memorial Studies", title: "Proper seeking of divine favour", videoid: 'pGY9SdGrRWg?si=I9tIr22Kynvb75jl' },
    { imgid: 'gospelinheaven.jpg', section: "Gospel in Heavens", title: "Gospel in Heavens", videoid: 'ZbLAq75sSNE?si=bQdyuyoiLVZIkE_j' },
    { imgid: 'santification.png', section: "Memorial Studies", title: "Perfecting sanctification with Godly fear", videoid: '3btLNYYEgXM?si=CY2AfYiIY2qkP3vL' },
    { imgid: 'callingelectsure.png', section: "New Creature", title: "Making our calling and election sure", videoid: 'QW5B0-RYRXc?si=QluH9MMnktIESvaO' },
    { imgid: 'onedayconventionnagercoil.png', section: "Spiritual", title: "Clean and unclean creatures", videoid: 'hyVQZvJQVDM?si=j_tZu29amec2pG9U' },
    { imgid: 'sin.png', section: "Spiritual", title: "Sin - Types and Definitions", videoid: 'oMT1Up9mJjg?si=BzSmx_vN_MA8AhYa' },
    { imgid: 'trialofChrist.png', section: "Memorial Studies", title: "Trials of Jesus Christ", videoid: 'nQbmXtNdrlY?si=CVPwOyxRGERL54_V' },
    { imgid: 'bread-wine-religious-ceremony.jpg', section: "Memorial Studies", title: "Memorial at the end of the age", videoid: '1Grs8Qc0j8E?si=DW2UVm9V-ZuzstSA' },
    { imgid: 'Memorialmeditation.png', section: "Memorial Studies", title: "Memorial meditation", videoid: 'kteTv28w6KI?si=CqkvRtD4UhsaJeRG' },
    { imgid: 'internationconvention.png', section: "Conventions", title: "One day Convention - Apostle James", videoid: 'byWAsAduQRQ?si=EiZgEzG1laTh6PGo' },
    { imgid: 'spiritualconvention.png', section: "Conventions", title: "One day Spiritual Convention", videoid: 'fH9NAYdx-oo?si=DGFATqD1PLV5zDxq' },
    { imgid: 'overcoming.png', section: "Conventions", title: "Internation Convention - Overcoming", videoid: 'aR0CK28qfis?si=_n1qvsG2F7cZiKqI' },
    { imgid: 'prememorialonvention.png', section: "Memorial Studies", title: "Pre Memorial Convention - 2024", videoid: 'fH9NAYdx-oo?si=9W8tF3asd2VSjiqT' },
    { imgid: 'prememorialconvention.png', section: "Memorial Studies", title: "Prememorial Convention", videoid: 'M75fVWj9oAM?si=r27_SU-VlMWhomZ1' },
    { imgid: 'bread-wine-religious-ceremony.jpg', section: "Memorial Studies", title: "International Bible Students Pre Memorial Convention", videoid: 'Jsn2Lz8517o?si=Lqw1z-1zlJ1HTg8o' },
    { imgid: 'paneldiscussionpsalms83.png', section: "Panel Discussion", title: "Panel Discussion - Psalms 83", videoid: 'iTsajhFSGKg?si=C8D6thfvv6AEFvKG' },
    { imgid: 'cc1.png', section: "Christian Concepts", title: "Christian Concepts - Truth", videoid: '32wmlPhibfI?si=cSLRQRcLpqnIV2zK' },
    { imgid: 'cc2.png', section: "Christian Concepts", title: "Christian Concepts - Conciousness Part2", videoid: 'AWeOMrQkYL4?si=9B4f_-QZlqwfIR6h' },
    { imgid: 'cc3.png', section: "Christian Concepts", title: "Christian Concepts - Liberty", videoid: 'GknhLVKlXQA?si=xH9GBhJQiEVhwJ0K' },

];  // Replace these with actual video IDs
// const videoimgpair = [{ imgid: 'bread-wine-religious-ceremony.jpg', title: "Pre memorial convention", videoid: 'https://www.youtube.com/live/pGY9SdGrRWg?si=I9tIr22Kynvb75jl' },
// { imgid: 'bread-wine-religious-ceremony.jpg', title: "The Trial of Jesus Christ", videoid: 'https://youtu.be/ZbLAq75sSNE?si=bQdyuyoiLVZIkE_j' },
// { imgid: 'bread-wine-religious-ceremony.jpg', title: "Cup of the Lord and Table of the Lord", videoid: 'https://youtu.be/3btLNYYEgXM?si=CY2AfYiIY2qkP3vL' },
// { imgid: 'bread-wine-religious-ceremony.jpg', title: "", videoid: 'https://youtu.be/byWAsAduQRQ?si=EiZgEzG1laTh6PGo' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/aR0CK28qfis?si=_n1qvsG2F7cZiKqI' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/M75fVWj9oAM?si=r27_SU-VlMWhomZ1' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/QW5B0-RYRXc?si=QluH9MMnktIESvaO' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/hyVQZvJQVDM?si=j_tZu29amec2pG9U' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://youtu.be/nQbmXtNdrlY?si=CVPwOyxRGERL54_V' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/C2VrI1b6evY?si=gHgddrzdTX7uUEj0' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://www.youtube.com/live/1Grs8Qc0j8E?si=DW2UVm9V-ZuzstSA' },
// { imgid: 'Alogo.jpg', title: "", videoid: 'https://youtu.be/kteTv28w6KI?si=CqkvRtD4UhsaJeRG' }

// ];  // Replace these with actual video IDs

// Function to load video thumbnails
// function loadVideoThumbnails() {
//     const container = document.getElementById('youtubediscourcescontainer');

//     videoimgpair.forEach(id => {

//         const div = document.createElement('div');
//         div.style = "margin:2%;display:flex;flex-direction: column;"
//         const img = document.createElement('img');
//         img.src = "./Assets/Videothumbnail/" + id.imgid;
//         img.alt = 'YouTube Thumbnail';
//         img.style = 'width:350px;height:200px;border-radius:20px;'
//         img.onclick = () => openPopup(id.videoid);

//         const videotitle = document.createElement('label');
//         videotitle.textContent = id.title;
//         videotitle.style = 'margin-top: 1%;text-align: center;font-family: cursive;background-color: #7a2a2a;color: white;border-radius: 20px;padding: 5px;'

//         div.appendChild(img);
//         div.appendChild(videotitle);
//         container.appendChild(div);
//     });
// }

// Function to open the popup and load the YouTube video
function openPopup(videoId) {
    const popup = document.getElementById('popup');
    const iframe = document.getElementById('video-frame');

    // Set the iframe src to the YouTube video URL
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    // iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    popup.style.display = 'flex';  // Show the popup
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const iframe = document.getElementById('video-frame');

    iframe.src = '';  // Stop the video
    popup.style.display = 'none';  // Hide the popup
}

// Load video thumbnails on page load
window.onload = loadVideoThumbnails;

