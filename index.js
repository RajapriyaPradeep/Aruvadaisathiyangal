const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Low, JSONFile } = require('lowdb');

require("dotenv").config();

const githubRepo = process.env.GITHUB_REPOSITORY;
const githubToken = process.env.GITHUB_TOKEN;

const app = express();
const PORT = process.env.PORT || 5000;

// Set up LowDB
const dbFile = path.join(__dirname, 'db.json'); // Or use './tmp/db.json' for Vercel
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Load initial data
(async () => {
    await db.read();
    db.data = db.data || { audios: [] };
    await db.write();
})();

// Set up middleware
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Get all entries
app.get('/api/entries', async (req, res) => {
    await db.read();
    res.json(db.data.audios);
});

// Add a new entry
app.post('/api/add-entry', async (req, res) => {
    const newEntry = req.body;

    await db.read();
    db.data.audios.push(newEntry);
    await db.write();

    res.status(200).send('Entry added');
});

// Update an entry
app.put('/api/update-entry/:id', async (req, res) => {
    const entryId = parseInt(req.params.id, 10);
    const updatedEntry = req.body;

    await db.read();
    const entryIndex = db.data.audios.findIndex(entry => entry.id === entryId);

    if (entryIndex === -1) {
        return res.status(404).send('Entry not found');
    }

    db.data.audios[entryIndex] = updatedEntry;
    await db.write();

    res.status(200).send('Entry updated');
});

// Delete an entry
app.delete('/api/delete-entry/:id', async (req, res) => {
    const entryId = parseInt(req.params.id, 10);

    await db.read();
    const initialLength = db.data.audios.length;
    db.data.audios = db.data.audios.filter(entry => entry.id !== entryId);
    
    if (db.data.audios.length === initialLength) {
        return res.status(404).send('Entry not found');
    }

    await db.write();
    res.status(200).send('Entry deleted');
});

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example API endpoint
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Vercel!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
