const express = require('express');
const path = require('path');
const app = express();

const TMDB_KEY = process.env.TMDB_KEY;

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/config', (req, res) => {
    res.json({ tmdb_key: TMDB_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Killermov HD running on port ${PORT}`));
