// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create the "audios" table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS audios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            tamil TEXT,
            year INTEGER,
            section TEXT,
            pdflink TEXT,
            audioUrl TEXT
        )
    `);
});

module.exports = db;
