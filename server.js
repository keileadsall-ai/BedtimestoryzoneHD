const express = require('express');
const path = require('path');
const app = express();

const TMDB_KEY = "b9c746781e1e9b084c4cc4f0420156d4";

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/config', (req, res) => {
    res.json({ tmdb_key: TMDB_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BedtimeStoryZoneHD LIVE on port ${PORT}`));
