const translations = {
    en: {
        audiodiscourse:"AUDIO DISCOURSES",
        topicalstudies:"TOPICAL STUDIES",
        chronology:"CHRONOLOGY",
        characterdevelopment:"CHARACTER DEVELOPMENT",
        isreal:"ISREAL",
        parables:"PARABLES",
        spiritbegotten:"SPIRIT BEGOTTEN",
        basicstudies:"BASIC STUDIES",
        conventions:"CONVENTIONS",
        memorialstudies:"MEMORIAL STUDIES",
        paneldiscussion:"PANEL DISCUSSION",
        spiritualstudies:"SPRITUAL STUDIES",
        symposium:"SYMPOSIUM",
        timeprophecy:"TIME PROPHECY",
        wildernesswondering:"WILDERNESS WONDERING",
        volumestudy:"VOLUME STUDY",
        volume1:"VOLUME 1",
        volume2:"VOLUME 2",
        volume3:"VOLUME 3",
        volume4:"VOLUME 4",
        volume5:"VOLUME 5",
        volume6:"VOLUME 6",
        questionbook:"QUESTION BOOK",
        reprint:"REPRINT",
        truthverse: "Sanctify them through thy truth: thy word is truth.- John 17:17",
        reasonforsite: "We were moved to create this site as stewards of the resources we've been entrusted with, especially given the growing number of requests for them. Over the years, the Lord has allowed us to collect various studies and materials that have been a blessing to His people, and many have expressed a need for easier access. This site is meant to be a simple archive of those resources, and we will update it as more are made available, trusting in the Lord’s provision.",
        brorussellmsg: "The true Gospel is not merely a message of good tidings respecting salvation to a few, but a message of great joy which shall be unto all people — the declaration that a Savior and Deliverer has been provided, and that in God's due time He shall be made known to all and His blessing shall be extended to all the families of the earth.",
        brorussellname: "— Charles Taze Russell"
    },
    ta: {
        audiodiscourse:"ஆடியோ சொற்பொழிவுகள்",
        topicalstudies:"தலைப்பு ஆய்வுகள்",
        chronology:"காலவரிசை",
        characterdevelopment:"குணநலன் வளர்ச்சி",
        isreal:"இஸ்ரேல்",
        parables:"உவமைகள்",
        spiritbegotten:"ஆவி பிறந்தது",
        basicstudies:"அடிப்படை ஆய்வுகள்",
        conventions:"மாநாடுகள்",
        memorialstudies:"நினைவு ஆய்வுகள்",
        paneldiscussion:"குழு விவாதம்",
        spiritualstudies:"ஆன்மீக ஆய்வுகள்",
        symposium:"சிம்போசியம்",
        timeprophecy:"நேரம் தீர்க்கதரிசனம்",
        wildernesswondering:"வனப்பு அதிசயம்",
        volumestudy:"தொகுதி ஆய்வு",
        volume1:"தொகுதி 1",
        volume2:"தொகுதி 2",
        volume3:"தொகுதி 3",
        volume4:"தொகுதி 4",
        volume5:"தொகுதி 5",
        volume6:"தொகுதி 6",
        questionbook:"கேள்விப் புத்தகம்",
        reprint:"மறுபதிப்பு",
        truthverse: "உமது சத்தியத்தினாலே அவர்களைப் பரிசுத்தமாக்கும்: உமது வார்த்தை சத்தியம்.- யோவான் 17:17",
        reasonforsite: "எங்களிடம் ஒப்படைக்கப்பட்ட வளங்களின் பொறுப்பாளர்களாக இந்தத் தளத்தை உருவாக்க நாங்கள் நகர்த்தப்பட்டோம், குறிப்பாக அவர்களுக்கான கோரிக்கைகளின் எண்ணிக்கை அதிகரித்து வருவதால். பல ஆண்டுகளாக, அவரது மக்களுக்கு ஆசீர்வாதமாக இருந்த பல்வேறு ஆய்வுகள் மற்றும் பொருட்களை சேகரிக்க இறைவன் அனுமதித்துள்ளார், மேலும் பலர் எளிதாக அணுகுவதற்கான தேவையை வெளிப்படுத்தியுள்ளனர். இந்த தளம் அந்த ஆதாரங்களின் எளிய காப்பகமாக இருக்க வேண்டும், மேலும் இறைவனின் ஏற்பாட்டில் நம்பிக்கை வைத்து மேலும் கிடைக்கும் போது அதை புதுப்பிப்போம்.",
        brorussellmsg: "உண்மையான நற்செய்தி என்பது ஒரு சிலருக்கு இரட்சிப்பைப் பற்றிய நற்செய்தியின் செய்தி மட்டுமல்ல, எல்லா மக்களுக்கும் மிகுந்த மகிழ்ச்சியைத் தரும் செய்தியாகும் - ஒரு இரட்சகரும் மீட்பரும் வழங்கப்பட்டு, கடவுளின் சரியான நேரத்தில் அவர் இருப்பார் என்ற அறிவிப்பு. அனைவருக்கும் தெரியப்படுத்தப்பட்டது மற்றும் அவருடைய ஆசீர்வாதம் பூமியின் அனைத்து குடும்பங்களுக்கும் நீட்டிக்கப்படும்.",
        brorussellname: "- சார்லஸ் டேஸ் ரஸ்ஸல்"
    }
};
let lang = localStorage.getItem("language");
const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        element.textContent = translations[lang][key] || element.textContent;
    });
 // Re-add the submenu if it’s removed
 const submenuContainer = document.getElementById("topicalstudy_submenu"); // Adjust selector
 // Create the main div element
 const submenu = document.createElement('div');
 submenu.className = 'submenu';
 let items = [];
if(localStorage.getItem("language") == 'en'){
// Define an array of items to create links
 items = [
    { lang: 'chronology', text: 'CHRONOLOGY' },
    { lang: 'characterdevelopment', text: 'CHARACTER DEVELOPMENT' },
    { lang: 'isreal', text: 'ISREAL' },
    { lang: 'parables', text: 'PARABLES' },
    { lang: 'spiritbegotten', text: 'SPIRIT BEGOTTEN' },
];
}
else{
  // Define an array of items to create links
 items = [
    { lang: 'chronology', text: 'காலவரிசை' },
    { lang: 'characterdevelopment', text: 'குணநலன் வளர்ச்சி' },
    { lang: 'isreal', text: 'இஸ்ரேல்' },
    { lang: 'parables', text: 'உவமைகள்' },
    { lang: 'spiritbegotten', text: 'ஆவி பிறந்தது' },
];  
}
// Loop through the items array and create links
items.forEach(item => {
    const link = document.createElement('a');
    link.className = 'dropdown-item';
    link.href = '#';
    link.setAttribute('data-lang', item.lang);
    link.textContent = item.text;
    
    // Set the onclick event to call navplaylist with the lang
    link.onclick = function() {
        navplaylist(item.lang); // Call the function with the appropriate lang
    };

    // Append the link to the submenu div
    submenu.appendChild(link);
});
submenuContainer.appendChild(submenu);
const volsubmenuContainer = document.getElementById("volumestudy_submenu"); // Adjust selector
// Create the main div element
const vsubmenu = document.createElement('div');
vsubmenu.className = 'submenu';
let vitems = [];
if(lang == 'en'){
// Define an array of items to create links
 vitems = [
    { lang: 'volume1', text: 'VOLUME 1' },
    { lang: 'volume2', text: 'VOLUME 2' },
    { lang: 'volume3', text: 'VOLUME 3' },
    { lang: 'volume4', text: 'VOLUME 4' },
    { lang: 'volume5', text: 'VOLUME 5' },
    { lang: 'volume6', text: 'VOLUME 6' }
];
}
else{
  // Define an array of items to create links
 vitems = [
    { lang: 'volume1', text: 'தொகுதி 1' },
    { lang: 'volume2', text: 'தொகுதி 2' },
    { lang: 'volume3', text: 'தொகுதி 3' },
    { lang: 'volume4', text: 'தொகுதி 4' },
    { lang: 'volume5', text: 'தொகுதி 5' },
    { lang: 'volume6', text: 'தொகுதி 6' }
];  
}
// Loop through the items array and create links
vitems.forEach(item => {
    const link = document.createElement('a');
    link.className = 'dropdown-item';
    link.href = '#';
    link.setAttribute('data-lang', item.lang);
    link.textContent = item.text;
    
    // Set the onclick event to call navplaylist with the lang
    link.onclick = function() {
        navplaylist(item.lang); // Call the function with the appropriate lang
    };

    // Append the link to the submenu div
    vsubmenu.appendChild(link);
});
volsubmenuContainer.appendChild(vsubmenu);

function searchaudio(){
    if(document.getElementById("searchkeyword").value != ""){
    let search_keyword = document.get
    window.location.href = 'https://aruvadaisathiyangal.in/audiodiscources.html?srch=' + document.getElementById("searchkeyword").value;
    }
}