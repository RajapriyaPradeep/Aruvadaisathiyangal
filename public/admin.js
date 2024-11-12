document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // const pdfFile = document.getElementById("pdfFile").files[0];
    const audioFile = document.getElementById("audioFile").files[0];

    // Upload PDF and audio files directly to GitHub
    // const pdfUrl = await uploadFileToGitHub(pdfFile);
    const pdfUrl = "";
    const audioUrl = await uploadFileToGitHub(audioFile);

    // Send the rest of the form data (metadata) to your backend
    const data = {
        topic: "3.Mystery of the Cross Part 2",
        audioUrl,
        pdfUrl,
        section: "basicstudies",
        tamil: "சிலுவையின் மர்மம் பகுதி2",
    };

    const response = await fetch("/add-entry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert("Entry added successfully!");
    } else {
        alert("Failed to add entry.");
    }
});
  
  async function loadEntries() {
    const response = await fetch("/entries");
    const entries = await response.json();
    document.getElementById("entryGrid").innerHTML = entries
      .map((entry, index) => `
        <div>
          <h4>${entry.topic} (${entry.tamil})</h4>
          <p>Section: ${entry.section}</p>
          <a href="${entry.pdflink}" target="_blank">PDF</a> | 
          <a href="${entry.audioUrl}" target="_blank">Audio</a>
          <button onclick="deleteEntry(${index})">Delete</button>
        </div>
      `)
      .join("");
  }
  
  async function deleteEntry(index) {
    await fetch(`/delete-entry/${index}`, { method: "DELETE" });
    loadEntries();
  }
  
  window.onload = loadEntries;

// Helper function to convert a file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!(file instanceof Blob)) {
            reject("The provided input is not a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// async function uploadFileToGitHub(file) {
//     // const url = `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/${file.name}`;
//     const url = `https://api.github.com/repos/RajapriyaPradeep/basics_studies/contents/${file.name}`;
//     const content = await fileToBase64(file); // Convert file to base64

//     const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Authorization": `Bearer ${GITHUB_TOKEN}`,  // Use GitHub token here
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             message: `Upload ${file.name}`,
//             content: content,  // Use the base64 content of the file
//         }),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to upload file to GitHub");
//     }

//     const data = await response.json();
//     return data.content.download_url;  // Return the URL of the uploaded file
// }

async function uploadFileToGitHub(file) {
    const fileContent = await fileToBase64(file); // Convert file to Base64

    const response = await fetch('/api/githubProxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileName: file.name.endsWith(".amr") ? file.name.replace(".amr", ".mp3") : file.name,
            fileContent: fileContent,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data.downloadUrl;
}

