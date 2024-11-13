const { Low, JSONFile } = require('lowdb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set up LowDB in a writable directory for Vercel
const dbFile = path.join('/tmp', 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Load initial data
(async () => {
    await db.read();
    db.data = db.data || { audios: [] };
    await db.write();
})();

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Get all entries
app.get('/api/entries', async (req, res) => {
    try {
        await db.read();
        res.json(db.data.audios);
    } catch (error) {
        console.error("Error in get entries:", error);
        res.status(500).send('Error retrieving entries');
    }
});

// Add a new entry
app.post('/api/add-entry', async (req, res) => {
    try {
        const newEntry = req.body;
        
        await db.read();
        db.data.audios.push(newEntry);
        await db.write();

        res.status(200).send('Entry added');
    } catch (error) {
        console.error("Error in add-entry:", error);
        res.status(500).send('Error saving data');
    }
});

// Update an entry
app.put('/api/update-entry/:id', async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error in update-entry:", error);
        res.status(500).send('Error updating entry');
    }
});

// Delete an entry
app.delete('/api/delete-entry/:id', async (req, res) => {
    try {
        const entryId = parseInt(req.params.id, 10);

        await db.read();
        const initialLength = db.data.audios.length;
        db.data.audios = db.data.audios.filter(entry => entry.id !== entryId);
        
        if (db.data.audios.length === initialLength) {
            return res.status(404).send('Entry not found');
        }

        await db.write();
        res.status(200).send('Entry deleted');
    } catch (error) {
        console.error("Error in delete-entry:", error);
        res.status(500).send('Error deleting entry');
    }
});

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
