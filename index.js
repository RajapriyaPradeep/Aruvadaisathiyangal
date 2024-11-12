const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");

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
const audiosJsonPath = path.join(__dirname, 'audios.json');
// Admin part starts Here

// Get all entries from audios.json
app.get('/api/entries', (req, res) => {
    fs.readFile(audiosJsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// Add a new entry to audios.json
app.post('/api/add-entry', async (req, res) => {
    const newEntry = req.body;

    try {
        // Fetch the current contents of audios.json from GitHub
        const fileRes = await axios.get(`https://api.github.com/repos/${githubRepo}/contents/audios.json`, {
            headers: {
                Authorization: `token ${githubToken}`
            }
        });
        const fileContent = Buffer.from(fileRes.data.content, 'base64').toString('utf-8');
        const entries = JSON.parse(fileContent);

        // Add the new entry
        entries.push(newEntry);

        // Encode updated content to base64
        const updatedContent = Buffer.from(JSON.stringify(entries, null, 2)).toString('base64');

        // Push the updated content back to GitHub
        await axios.put(`https://api.github.com/repos/${githubRepo}/contents/audios.json`, {
            message: "Add new entry to audios.json",
            content: updatedContent,
            sha: fileRes.data.sha // Required to update the file
        }, {
            headers: {
                Authorization: `token ${githubToken}`
            }
        });

        res.status(200).send('Entry added successfully');
    } catch (error) {
        console.error("Error updating audios.json:", error.response?.data || error.message);
        res.status(500).send('Error saving data');
    }
});



// Update an existing entry in audios.json
app.put('/api/update-entry/:id', (req, res) => {
    const updatedEntry = req.body;
    const entryId = parseInt(req.params.id, 10);

    fs.readFile(audiosJsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const entries = JSON.parse(data);
        const entryIndex = entries.findIndex(entry => entry.id === entryId);

        if (entryIndex === -1) {
            return res.status(404).send('Entry not found');
        }

        entries[entryIndex] = updatedEntry;

        fs.writeFile(audiosJsonPath, JSON.stringify(entries, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            res.status(200).send('Entry updated');
        });
    });
});

// Delete an entry from audios.json
app.delete('/api/delete-entry/:id', (req, res) => {
    const entryId = parseInt(req.params.id, 10);

    fs.readFile(audiosJsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const entries = JSON.parse(data);
        const updatedEntries = entries.filter(entry => entry.id !== entryId);

        if (updatedEntries.length === entries.length) {
            return res.status(404).send('Entry not found');
        }

        fs.writeFile(audiosJsonPath, JSON.stringify(updatedEntries, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            res.status(200).send('Entry deleted');
        });
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
