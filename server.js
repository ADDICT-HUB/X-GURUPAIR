const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

let pairingCodes = {}; // { code: number }
let sessions = {};     // { sessionId: number }

// Serve root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Generate pairing code
app.post('/generate-pair', (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: 'Number required' });

    const pairCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    pairingCodes[pairCode] = number;

    res.json({ pairCode });
});

// Verify pairing code (called by your bot after receiving the code via WhatsApp)
app.post('/verify-pair', (req, res) => {
    const { pairCode } = req.body;
    const number = pairingCodes[pairCode];

    if (!number) return res.status(400).json({ error: 'Invalid pairing code' });

    const sessionId = crypto.randomBytes(6).toString('hex');
    sessions[sessionId] = number;

    delete pairingCodes[pairCode]; // Remove used code

    res.json({ sessionId });
});

// Optional: view all sessions
app.get('/sessions', (req, res) => {
    res.json(sessions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
