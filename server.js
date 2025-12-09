const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.static('public'));
app.use(express.json());

let sessions = {}; // { sessionId: { number, createdAt } }

app.post('/pair', (req, res) => {
    const { number } = req.body;

    if (!number) return res.status(400).json({ error: 'Number is required' });

    const sessionId = crypto.randomBytes(6).toString('hex');
    sessions[sessionId] = { number, createdAt: Date.now() };

    const whatsappLink = `https://wa.me/${number}?text=PAIR_${sessionId}`;

    res.json({ sessionId, whatsappLink });
});

app.get('/sessions', (req, res) => {
    res.json(sessions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));