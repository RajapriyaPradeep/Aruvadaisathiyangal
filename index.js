import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'; // Importing JSONFile specifically for Node environment
import path from 'path';
import { fileURLToPath } from 'url';

// Set up the file path for the database JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'db.json');

// Configure the database using JSONFile and Low
const adapter = new JSONFile(filePath);
const db = new Low(adapter);

// Function to initialize and use the database
async function initializeDb() {
  await db.read(); // Load data from JSON file
  db.data = db.data || { items: [] }; // Initialize data if empty

  // Example: Add an item to the database
  db.data.items.push({ name: 'New Item' });

  await db.write(); // Save changes to the JSON file
}

// Call the function to initialize and test the database
initializeDb().catch(console.error);
