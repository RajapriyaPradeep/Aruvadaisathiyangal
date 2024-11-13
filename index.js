const { Low, JSONFile } = require('lowdb');
const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const db = require('./db'); // Ensure the path is correct

require("dotenv").config();

const githubRepo = process.env.GITHUB_REPOSITORY;
const githubToken = process.env.GITHUB_TOKEN;

const app = express();
const PORT = process.env.PORT || 5000;

// Set the limits for both body parser and file upload
app.use(bodyParser.json({ limit: '100mb' })); // Set a larger limit for JSON payload
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' })); // Set larger limits for URL-encoded data

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from "Public" directory (case-sensitive)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.static("public"));
// app.use(fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB (adjust this as needed)
//   }));

// Path to the JSON files (adjust paths for Vercel’s read-only system)
const audioDataFilePath = path.join(__dirname, 'audios.json');
const faqDataFilePath = path.join(__dirname, 'faqs.json');
const dataFile = "audios.json";


// Path to your audios.json file
// const audiosJsonPath = path.join(__dirname, 'audios.json');
// Admin part starts Here
// Read audios.json
const audiosJsonPath = path.resolve(__dirname, 'audios.json');
const audiosData = JSON.parse(fs.readFileSync(audiosJsonPath, 'utf-8'));

// Insert data into the SQLite table
// Get all entries
app.get('/api/entries', (req, res) => {
    db.all("SELECT * FROM audios", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error fetching data");
        }
        res.json(rows);
    });
});

// Add a new entry
app.post('/api/add-entry', (req, res) => {
    const { title, tamil, year, section, pdflink, audioUrl } = req.body;
    const query = `
        INSERT INTO audios (title, tamil, year, section, pdflink, audioUrl)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [title, tamil, year, section, pdflink, audioUrl], function(err) {
        if (err) {
            return res.status(500).send("Error saving data");
        }
        res.status(200).send({ id: this.lastID, message: "Entry added successfully" });
    });
});

// Update an entry
app.put('/api/update-entry/:id', (req, res) => {
    const { title, tamil, year, section, pdflink, audioUrl } = req.body;
    const { id } = req.params;
    const query = `
        UPDATE audios SET title = ?, tamil = ?, year = ?, section = ?, pdflink = ?, audioUrl = ?
        WHERE id = ?
    `;
    db.run(query, [title, tamil, year, section, pdflink, audioUrl, id], function(err) {
        if (err) {
            return res.status(500).send("Error updating data");
        }
        res.status(200).send("Entry updated successfully");
    });
});

// Delete an entry
app.delete('/api/delete-entry/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM audios WHERE id = ?`;
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).send("Error deleting data");
        }
        res.status(200).send("Entry deleted successfully");
    });
});
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
