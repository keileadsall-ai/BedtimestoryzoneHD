const express = require('express');
const path = require('path');
const app = express();

// Pulling your TMDB Key from environment variables for security on Render
const TMDB_KEY = process.env.TMDB_KEY;

// Serving the static files (images, css, etc.) from the root directory
app.use(express.static(__dirname));

// Main route to serve your blood-soaked index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for the frontend to grab the TMDB key securely
app.get('/api/config', (req, res) => {
    res.json({ tmdb_key: TMDB_KEY });
});

// Port configuration for Render (defaults to 3000 for local testing)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`   KILLERMOV HD: THE HARVEST HAS BEGUN   `);
    console.log(`   PORT: ${PORT} | STATUS: BLOOD SOAKED   `);
    console.log(`-----------------------------------------`);
});
