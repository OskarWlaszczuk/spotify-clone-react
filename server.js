const express = require('express');
const lyricsFinder = require('lyrics-finder');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/lyrics', async (req, res) => {
    const { artist, track } = req.query;
    try {
        const lyrics = await lyricsFinder(artist, track);
        res.send({ lyrics });
    } catch (error) {
        res.status(500).send({ error: 'Nie znaleziono tekstu.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});