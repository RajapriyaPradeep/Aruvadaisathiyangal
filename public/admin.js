document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entryData = {
      topic: formData.get("topic"),
      tamil: formData.get("tamil"),
      section: formData.get("section"),
      pdf: formData.get("pdflink"),
      audio: formData.get("audioUrl"),
    };
  
    try {
      await fetch("/add-entry", {
        method: "POST",
        body: formData,
      });
      alert("Entry added successfully!");
      loadEntries();
    } catch (err) {
      alert("Error adding entry: " + err.message);
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