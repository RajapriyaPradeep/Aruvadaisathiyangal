const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");

require("dotenv").config();

const githubRepo = process.env.GITHUB_REPO;
const githubToken = process.env.GITHUB_TOKEN;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from "Public" directory (case-sensitive)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

// Path to the JSON files (adjust paths for Vercel’s read-only system)
const audioDataFilePath = path.join(__dirname, 'audios.json');
const faqDataFilePath = path.join(__dirname, 'faqs.json');
const dataFile = "audios.json";

// Admin part starts Here

app.get("/entries", (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json(data);
  });
  
  app.post("/add-entry", async (req, res) => {
    if (!req.files || !req.files.pdf || !req.files.audio) {
      return res.status(400).send("PDF and audio files are required.");
    }
  
    const pdfFile = req.files.pdf;
    const audioFile = req.files.audio;
    const audioFilePath = audioFile.tempFilePath;
  
    let audioUrl = "";
    let pdfUrl = "";
  
    try {
      pdfUrl = await uploadToGitHub(pdfFile);
      if (audioFile.mimetype === "audio/amr") {
        await convertAmrToMp3(audioFilePath);
        audioUrl = await uploadToGitHub({ name: audioFile.name.replace(".amr", ".mp3"), data: fs.readFileSync(audioFilePath) });
      } else {
        audioUrl = await uploadToGitHub(audioFile);
      }
  
      const newEntry = {
        topic: req.body.topic,
        tamil: req.body.tamil,
        section: req.body.section,
        pdfUrl,
        audioUrl,
        sizeMb: (audioFile.size / 1024 / 1024).toFixed(2),
        year: new Date().getFullYear(),
      };
  
      const data = JSON.parse(fs.readFileSync(dataFile));
      data.push(newEntry);
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send("Failed to add entry.");
    }
  });
  
  app.delete("/delete-entry/:index", (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    data.splice(req.params.index, 1);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.sendStatus(204);
  });
  
  async function uploadToGitHub(file) {
    const url = `https://api.github.com/repos/${githubRepo}/contents/${file.name}`;
    const content = file.data.toString("base64");
  
    await axios.put(
      url,
      {
        message: `Upload ${file.name}`,
        content,
      },
      {
        headers: { Authorization: `Bearer ${githubToken}` },
      }
    );
  
    return `https://raw.githubusercontent.com/${githubRepo}/main/${file.name}`;
  }
  
  function convertAmrToMp3(filePath) {
    return new Promise((resolve, reject) => {
      const mp3Path = filePath.replace(".amr", ".mp3");
      ffmpeg(filePath)
        .toFormat("mp3")
        .save(mp3Path)
        .on("end", () => resolve(mp3Path))
        .on("error", (err) => reject(err));
    });
  }

// Admin part ends Here


// Function to read data from audios.json file
const readData = () => {
    try {
        if (fs.existsSync(audioDataFilePath)) {
            const data = fs.readFileSync(audioDataFilePath);
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error reading the audios.json file:", error);
    }
    return [];
};

// Endpoint to serve the home page
app.get('/', (req, res) => {
    console.log("Serving index.html");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to add a new video (This will not work on Vercel due to read-only limitations)
app.post('/api/videos', (req, res) => {
    res.status(403).json({ message: "Data storage not supported on Vercel's read-only file system" });
});

// Endpoint to get all default videos
app.get('/api/defaultvideos', (req, res) => {
    const videos = readData();
    res.json(videos);
});

// Endpoint to search videos by section or title
app.get('/api/videos', (req, res) => {
    const { search } = req.query;
    const videos = readData();
    const filteredVideos = videos.filter(video =>
        video.section.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredVideos);
});
// Endpoint to search videos by recent discources
app.get('/api/recent', (req, res) => {
    const videos = readData();
    const filteredVideos = videos.filter(video =>
        video.year == (new Date().getFullYear())
    );
    res.json(filteredVideos);
});

// Endpoint to search videos by keyword
app.get('/api/searchkeywordaudios', (req, res) => {
    const { search } = req.query;
    const videos = readData();
    const filteredVideos = videos.filter(video =>
        video.topic.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredVideos);
});

// Endpoint to fetch FAQs
app.get('/api/faqs', (req, res) => {
    fs.readFile(faqDataFilePath, (err, data) => {
        if (err) {
            console.error("Error reading faqs.json:", err);
            res.status(500).send('Error reading FAQs file');
            return;
        }
        const faqs = JSON.parse(data);
        const { search } = req.query;
        const filteredFaqs = search
            ? faqs.filter(faq => faq.section === search)
            : faqs;
        res.json(filteredFaqs);
    });
});

// Example API endpoint
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Vercel!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;  // Export app for Vercel compatibility
