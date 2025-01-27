const width = window.innerWidth;

if (width <= 480 && ((localStorage.getItem("viewmode") == null) || localStorage.getItem("viewmode") == undefined)) {
    localStorage.setItem("viewmode", "mobile");
}

if (width <= 480) {

}
else {
    document.getElementById("footersec").style.display = "none";
}

var Dropdowns = function () {
    var t = $(".dropup, .dropright, .dropdown, .dropleft")
        , e = $(".dropdown-menu")
        , r = $(".dropdown-menu .dropdown-menu");
    $(".dropdown-menu .dropdown-toggle").on("click", function () {
        var a;
        return (a = $(this)).closest(t).siblings(t).find(e).removeClass("show"),
            a.next(r).toggleClass("show"),
            !1
    }),
        t.on("hide.bs.dropdown", function () {
            var a, t;
            a = $(this),
                (t = a.find(r)).length && t.removeClass("show")
        })
}()

function viewmode(mode) {
    if (mode == "mobile")
        localStorage.setItem("viewmode", "mobile");
    else
        localStorage.setItem("viewmode", "desktop");
}
// const translations = {
//     en: {
//         audiodiscourse:"AUDIO DISCOURSES",
//         topicalstudies:"TOPICAL STUDIES",
//         chronology:"CHRONOLOGY",
//         characterdevelopment:"CHARACTER DEVELOPMENT",
//         isreal:"ISREAL",
//         parables:"PARABLES",
//         spiritbegotten:"SPIRIT BEGOTTEN",
//         basicstudies:"BASIC STUDIES",
//         conventions:"CONVENTIONS",
//         memorialstudies:"MEMORIAL STUDIES",
//         paneldiscussion:"PANEL DISCUSSION",
//         spiritualstudies:"SPRITUAL STUDIES",
//         symposium:"SYMPOSIUM",
//         timeprophecy:"TIME PROPHECY",
//         wildernesswondering:"WILDERNESS WONDERING",
//         volumestudy:"VOLUME STUDY",
//         volume1:"VOLUME 1",
//         volume2:"VOLUME 2",
//         volume3:"VOLUME 3",
//         volume4:"VOLUME 4",
//         volume5:"VOLUME 5",
//         volume6:"VOLUME 6",
//         questionbook:"QUESTION BOOK",
//         reprint:"REPRINT",
//         truthverse: "Sanctify them through thy truth: thy word is truth.- John 17:17",
//         reasonforsite: "We were moved to create this site as stewards of the resources we've been entrusted with, especially given the growing number of requests for them. Over the years, the Lord has allowed us to collect various studies and materials that have been a blessing to His people, and many have expressed a need for easier access. This site is meant to be a simple archive of those resources, and we will update it as more are made available, trusting in the Lord’s provision.",
//         brorussellmsg: "The true Gospel is not merely a message of good tidings respecting salvation to a few, but a message of great joy which shall be unto all people — the declaration that a Savior and Deliverer has been provided, and that in God's due time He shall be made known to all and His blessing shall be extended to all the families of the earth.",
//         brorussellname: "— Charles Taze Russell"
//     },
//     ta: {
//         audiodiscourse:"ஆடியோ சொற்பொழிவுகள்",
//         topicalstudies:"தலைப்பு ஆய்வுகள்",
//         chronology:"காலவரிசை",
//         characterdevelopment:"குணநலன் வளர்ச்சி",
//         isreal:"இஸ்ரேல்",
//         parables:"உவமைகள்",
//         spiritbegotten:"ஆவி பிறந்தது",
//         basicstudies:"அடிப்படை ஆய்வுகள்",
//         conventions:"மாநாடுகள்",
//         memorialstudies:"நினைவு ஆய்வுகள்",
//         paneldiscussion:"குழு விவாதம்",
//         spiritualstudies:"ஆன்மீக ஆய்வுகள்",
//         symposium:"சிம்போசியம்",
//         timeprophecy:"நேரம் தீர்க்கதரிசனம்",
//         wildernesswondering:"வனப்பு அதிசயம்",
//         volumestudy:"தொகுதி ஆய்வு",
//         volume1:"தொகுதி 1",
//         volume2:"தொகுதி 2",
//         volume3:"தொகுதி 3",
//         volume4:"தொகுதி 4",
//         volume5:"தொகுதி 5",
//         volume6:"தொகுதி 6",
//         questionbook:"கேள்விப் புத்தகம்",
//         reprint:"மறுபதிப்பு",
//         truthverse: "உமது சத்தியத்தினாலே அவர்களைப் பரிசுத்தமாக்கும்: உமது வார்த்தை சத்தியம்.- யோவான் 17:17",
//         reasonforsite: "எங்களிடம் ஒப்படைக்கப்பட்ட வளங்களின் பொறுப்பாளர்களாக இந்தத் தளத்தை உருவாக்க நாங்கள் நகர்த்தப்பட்டோம், குறிப்பாக அவர்களுக்கான கோரிக்கைகளின் எண்ணிக்கை அதிகரித்து வருவதால். பல ஆண்டுகளாக, அவரது மக்களுக்கு ஆசீர்வாதமாக இருந்த பல்வேறு ஆய்வுகள் மற்றும் பொருட்களை சேகரிக்க இறைவன் அனுமதித்துள்ளார், மேலும் பலர் எளிதாக அணுகுவதற்கான தேவையை வெளிப்படுத்தியுள்ளனர். இந்த தளம் அந்த ஆதாரங்களின் எளிய காப்பகமாக இருக்க வேண்டும், மேலும் இறைவனின் ஏற்பாட்டில் நம்பிக்கை வைத்து மேலும் கிடைக்கும் போது அதை புதுப்பிப்போம்.",
//         brorussellmsg: "உண்மையான நற்செய்தி என்பது ஒரு சிலருக்கு இரட்சிப்பைப் பற்றிய நற்செய்தியின் செய்தி மட்டுமல்ல, எல்லா மக்களுக்கும் மிகுந்த மகிழ்ச்சியைத் தரும் செய்தியாகும் - ஒரு இரட்சகரும் மீட்பரும் வழங்கப்பட்டு, கடவுளின் சரியான நேரத்தில் அவர் இருப்பார் என்ற அறிவிப்பு. அனைவருக்கும் தெரியப்படுத்தப்பட்டது மற்றும் அவருடைய ஆசீர்வாதம் பூமியின் அனைத்து குடும்பங்களுக்கும் நீட்டிக்கப்படும்.",
//         brorussellname: "- சார்லஸ் டேஸ் ரஸ்ஸல்"
//     }
// };
// let lang = localStorage.getItem("language");
// if(lang == undefined || lang == null)
//     lang = 'en'
// else
//     lang = localStorage.getItem("language")

// const elements = document.querySelectorAll('[data-lang]');
//     elements.forEach(element => {
//         const key = element.getAttribute('data-lang');
//         element.textContent = translations[lang][key] || element.textContent;
//     });
//  // Re-add the submenu if it’s removed
//  const submenuContainer = document.getElementById("topicalstudy_submenu"); // Adjust selector
//  // Create the main div element
//  const submenu = document.createElement('div');
//  submenu.className = 'submenu';
//  let items = [];
// if(localStorage.getItem("language") == 'en'){
// // Define an array of items to create links
//  items = [
//     { lang: 'chronology', text: 'CHRONOLOGY' },
//     { lang: 'characterdevelopment', text: 'CHARACTER DEVELOPMENT' },
//     { lang: 'isreal', text: 'ISREAL' },
//     { lang: 'parables', text: 'PARABLES' },
//     { lang: 'spiritbegotten', text: 'SPIRIT BEGOTTEN' },
// ];
// }
// else{
//   // Define an array of items to create links
//  items = [
//     { lang: 'chronology', text: 'காலவரிசை' },
//     { lang: 'characterdevelopment', text: 'குணநலன் வளர்ச்சி' },
//     { lang: 'isreal', text: 'இஸ்ரேல்' },
//     { lang: 'parables', text: 'உவமைகள்' },
//     { lang: 'spiritbegotten', text: 'ஆவி பிறந்தது' },
// ];  
// }
// // Loop through the items array and create links
// items.forEach(item => {
//     const link = document.createElement('a');
//     link.className = 'dropdown-item';
//     link.href = '#';
//     link.setAttribute('data-lang', item.lang);
//     link.textContent = item.text;

//     // Set the onclick event to call navplaylist with the lang
//     link.onclick = function() {
//         navplaylist(item.lang); // Call the function with the appropriate lang
//     };

//     // Append the link to the submenu div
//     submenu.appendChild(link);
// });
// submenuContainer.appendChild(submenu);
// const volsubmenuContainer = document.getElementById("volumestudy_submenu"); // Adjust selector
// // Create the main div element
// const vsubmenu = document.createElement('div');
// vsubmenu.className = 'submenu';
// let vitems = [];
// if(lang == 'en'){
// // Define an array of items to create links
//  vitems = [
//     { lang: 'volume1', text: 'VOLUME 1' },
//     { lang: 'volume2', text: 'VOLUME 2' },
//     { lang: 'volume3', text: 'VOLUME 3' },
//     { lang: 'volume4', text: 'VOLUME 4' },
//     { lang: 'volume5', text: 'VOLUME 5' },
//     { lang: 'volume6', text: 'VOLUME 6' }
// ];
// }
// else{
//   // Define an array of items to create links
//  vitems = [
//     { lang: 'volume1', text: 'தொகுதி 1' },
//     { lang: 'volume2', text: 'தொகுதி 2' },
//     { lang: 'volume3', text: 'தொகுதி 3' },
//     { lang: 'volume4', text: 'தொகுதி 4' },
//     { lang: 'volume5', text: 'தொகுதி 5' },
//     { lang: 'volume6', text: 'தொகுதி 6' }
// ];  
// }
// // Loop through the items array and create links
// vitems.forEach(item => {
//     const link = document.createElement('a');
//     link.className = 'dropdown-item';
//     link.href = '#';
//     link.setAttribute('data-lang', item.lang);
//     link.textContent = item.text;

//     // Set the onclick event to call navplaylist with the lang
//     link.onclick = function() {
//         navplaylist(item.lang); // Call the function with the appropriate lang
//     };

//     // Append the link to the submenu div
//     vsubmenu.appendChild(link);
// });
// volsubmenuContainer.appendChild(vsubmenu);

// Function to switch between languages
// function setLanguage(lang) {
//     const elements = document.querySelectorAll('[data-lang]');
//     elements.forEach(element => {
//         const key = element.getAttribute('data-lang');
//         element.textContent = translations[lang][key] || element.textContent;
//     });

//     // Re-add the submenu if it’s removed
//     const submenuContainer = document.getElementById("topicalstudy_submenu"); // Adjust selector
//     // Create the main div element
//     const submenu = document.createElement('div');
//     submenu.className = 'submenu';
//     let items = [];
//     if(lang == 'en'){
//         localStorage.setItem("language", "en");
//     // resize the font 20 16 18
//     document.getElementById("Bibleverse").style.fontSize = "20px";
//     document.getElementById("biblestudenttxt").style.fontSize = "16px";
//     document.getElementById("brorussellquotes").style.fontSize = "18px";
//     document.getElementById("brorussellname").style.fontSize = "18px";


//     // Define an array of items to create links
//      items = [
//         { lang: 'chronology', text: 'CHRONOLOGY' },
//         { lang: 'characterdevelopment', text: 'CHARACTER DEVELOPMENT' },
//         { lang: 'isreal', text: 'ISREAL' },
//         { lang: 'parables', text: 'PARABLES' },
//         { lang: 'spiritbegotten', text: 'SPIRIT BEGOTTEN' },
//     ];
//     }
//     else{
//         localStorage.setItem("language", "ta");
//     // resize the font 20 16 18
//     document.getElementById("Bibleverse").style.fontSize = "18px";
//     document.getElementById("biblestudenttxt").style.fontSize = "14px";
//     document.getElementById("brorussellquotes").style.fontSize = "15px";
//     document.getElementById("brorussellname").style.fontSize = "15px";
//       // Define an array of items to create links
//      items = [
//         { lang: 'chronology', text: 'காலவரிசை' },
//         { lang: 'characterdevelopment', text: 'குணநலன் வளர்ச்சி' },
//         { lang: 'isreal', text: 'இஸ்ரேல்' },
//         { lang: 'parables', text: 'உவமைகள்' },
//         { lang: 'spiritbegotten', text: 'ஆவி பிறந்தது' },
//     ];  
//     }
//     // Loop through the items array and create links
//     items.forEach(item => {
//         const link = document.createElement('a');
//         link.className = 'dropdown-item';
//         link.href = '#';
//         link.setAttribute('data-lang', item.lang);
//         link.textContent = item.text;

//         // Set the onclick event to call navplaylist with the lang
//         link.onclick = function() {
//             navplaylist(item.lang); // Call the function with the appropriate lang
//         };

//         // Append the link to the submenu div
//         submenu.appendChild(link);
//     });
//     submenuContainer.appendChild(submenu);
//     const volsubmenuContainer = document.getElementById("volumestudy_submenu"); // Adjust selector
//     // Create the main div element
//     const vsubmenu = document.createElement('div');
//     vsubmenu.className = 'submenu';
//     let vitems = [];
//     if(lang == 'en'){
//     // Define an array of items to create links
//      vitems = [
//         { lang: 'volume1', text: 'VOLUME 1' },
//         { lang: 'volume2', text: 'VOLUME 2' },
//         { lang: 'volume3', text: 'VOLUME 3' },
//         { lang: 'volume4', text: 'VOLUME 4' },
//         { lang: 'volume5', text: 'VOLUME 5' },
//         { lang: 'volume6', text: 'VOLUME 6' }
//     ];
//     }
//     else{
//       // Define an array of items to create links
//      vitems = [
//         { lang: 'volume1', text: 'தொகுதி 1' },
//         { lang: 'volume2', text: 'தொகுதி 2' },
//         { lang: 'volume3', text: 'தொகுதி 3' },
//         { lang: 'volume4', text: 'தொகுதி 4' },
//         { lang: 'volume5', text: 'தொகுதி 5' },
//         { lang: 'volume6', text: 'தொகுதி 6' }
//     ];  
//     }
//     // Loop through the items array and create links
//     vitems.forEach(item => {
//         const link = document.createElement('a');
//         link.className = 'dropdown-item';
//         link.href = '#';
//         link.setAttribute('data-lang', item.lang);
//         link.textContent = item.text;

//         // Set the onclick event to call navplaylist with the lang
//         link.onclick = function() {
//             navplaylist(item.lang); // Call the function with the appropriate lang
//         };

//         // Append the link to the submenu div
//         vsubmenu.appendChild(link);
//     });
//     volsubmenuContainer.appendChild(vsubmenu);
// }
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
    // background: rgba(255, 255, 255, 0.14);
    // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    // backdrop-filter: blur(20px);
    // tooltip.classList.add("custom-tooltip");
    //Change color as per the type
    if (title == "The World That Was -- 1st Dispensation" || title == "The Present Evil World -- 2nd Dispensation" || title == "The World to Come -- 3rd Dispensation" || title == "Patriarchal Age" || title == "Jewish Age" || title == "Gospel Age" || title == "Messianic Age" || title == "Ages to Come" || title == "Israel's time of trouble in Jewish Harvest: Separation of Wheat and Chaff" || title == "World's time of trouble in Gospel Harvest: Separation of Wheat and Tares" || title == "Satan's Little Season") {
        // tooltip.style.backgroundColor = "#b83a01";
        tooltip.style.background = "rgba(184, 58, 1, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        tooltip.style.color = "#b83a01";
        tooltip.innerHTML = `<i class="fas fa-clock" style="color:#b83a01"></i>&nbsp;&nbsp;${title} `;
        // container.appendChild(tooltip);
    }
    // else if(title == "State of divine glory and power of office" || title=="State of spirit birth" || title=="State of spirit begettal" || title=="State of God's favor (to humans)"||title=="State of God's typical favor"||title=="State of Sin and depravity")
    else if (title == "Plane Of Divine Glory And Power Of Office" || title == "Plane Of Spirit Birth" || title == "Plane Of Spirit Begettal" || title == "Plane Of God's Favor (to Humans)" || title == "Plane Of God's Typical Favor" || title == "Plane Of Sin And Depravity") {
        // tooltip.style.backgroundColor = "#fb8345";
        tooltip.style.background = "rgba(251, 139, 61, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        tooltip.style.color = "#fb8345";
        tooltip.innerHTML = `<i class="fas fa-minus" style="color:#fb8345"></i>&nbsp;&nbsp;${title} `;
    }
    else if (title == "Adam in perfection" || title == "Fallen Adam and his posterity, before the flood" || title == "Ancient worthies as individuals" || title == "Mankind from flood to Messianic Age" || title == "Fleshly Israel typically justified as a nation") {
        tooltip.style.background = "rgba(138, 110, 55, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        // tooltip.style.backgroundColor = "#8a6e37";
        tooltip.style.color = "#8a6e37";
        tooltip.innerHTML = `<i class="fas fa-caret-up" style="color:#8a6e37"></i>&nbsp;&nbsp;${title} `;
    }
    else if (title == "Jesus at age 30, a perfect man" || title == "Jesus, spirit-begotten at Jordan" || title == "Jesus, resurrected as a divine being" || title == "Jesus, 40 days after resurrection, in divine glory" || title == "Jesus, in Gospel Age, set down with Father on throne") {
        tooltip.style.background = "rgba(121, 18, 26, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        // tooltip.style.backgroundColor = "#79121a";
        tooltip.style.color = "#79121a";
        tooltip.innerHTML = `<i class="fas fa-cross" style="color:#79121a"></i>&nbsp;&nbsp;${title} `;
    }
    else if (title == "Spirit-begotten class who become the Great Company" || title == "Spirit-begotten Class who become the Bride of Christ" || title == "Believers, but not fully consecrated" || title == "Wolves in sheep's clothing; church-goers, but not believers; hypocrites") {
        tooltip.style.background = "rgba(83, 56, 47, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        // tooltip.style.backgroundColor = "#53382f";
        tooltip.style.color = "#53382f";
        tooltip.innerHTML = `<i class="fas fa-bible" style="color:#53382f"></i>&nbsp;&nbsp;${title} `;
    }
    else if (title == "Jesus, at His second advent" || title == "Little Flock, separating from Babylon" || title == "Great Company, failing to gain chief reward" || title == "Babylon, larger part of the nominal church, falling; some remaining on Plane N, others falling below" || title == "Babylon, hypocrite element of nominal church, falling to Plane R with unbelievers" || title == "The glorified Christ, head and body") {
        tooltip.style.background = "rgba(166, 100, 61, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        // tooltip.style.backgroundColor = "#a6643d";
        tooltip.style.color = "#a6643d";
        tooltip.innerHTML = `<i class="fas fa-seedling" style="color:#a6643d"></i>&nbsp;&nbsp;${title} `;
    }
    else {
        tooltip.style.background = "rgba(236,163,37, 0.2)";
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        tooltip.style.fontWeight = "bolder";
        // tooltip.style.backgroundColor = "#eca325";
        tooltip.style.color = "#eca325";
        tooltip.innerHTML = `<i class="fas fa-sun" style="color:#eca325"></i>&nbsp;&nbsp;${title} `;
    }

    tooltip.style.fontFamily = "FontAwesome, serif";
    tooltip.style.position = "absolute";
    tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
    tooltip.style.padding = "8px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "14px";
    tooltip.style.pointerEvents = "none"; // Prevents the tooltip from blocking other interactions
    tooltip.style.zIndex = "2000";
    tooltip.style.fontFamily = "serif";

    // tooltip.textContent = title; // Set the tooltip text to the removed title content

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

document.addEventListener('DOMContentLoaded', function () {
    // Ensure all dropdown menus are hidden initially
    document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
        menu.classList.remove('show');
    });

    const images = document.querySelectorAll(".fade-in-image");

    images.forEach((img) => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });

        // If the image is cached, the "load" event might not fire. Force trigger it.
        if (img.complete) {
            img.dispatchEvent(new Event("load"));
        }
    });
});
