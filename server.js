const express = require('express');
const path = require('path');
const axios = require('axios'); // We'll need this for the proxy
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Add this proxy endpoint
app.get('/video-proxy', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        if (!videoUrl || !videoUrl.includes('vidsrc.pm')) {
            return res.status(400).send('Invalid request');
        }
        
        const response = await axios.get(videoUrl, {
            responseType: 'stream',
            headers: {
                'Referer': 'https://vidsrc.pm/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        // Forward the headers from the original response
        Object.entries(response.headers).forEach(([key, value]) => {
            if (key.toLowerCase() !== 'content-encoding' && key.toLowerCase() !== 'transfer-encoding') {
                res.setHeader(key, value);
            }
        });
        
        // Pipe the video stream to the client
        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Proxy error');
    }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`The Ritual has begun on port ${PORT}`));
