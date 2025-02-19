const express = require('express');
const db = require('./db/connect');
const cors = require('cors');
const generateAIResponse = require('./ia');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/conversations', async (req, res) => {
    const { user_message } = req.body;

    if (!user_message) {
        return res.status(400).json({ error: "Message utilisateur requis" });
    }

    try {
        const ai_message = await generateAIResponse(user_message); 

        db.query(
            'INSERT INTO conversations (user_message, ai_message) VALUES (?, ?)',
            [user_message, ai_message],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ id: result.insertId, user_message, ai_message });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la communication avec l'IA" });
    }
});

app.get('/conversations', (req, res) => {
    db.query('SELECT * FROM conversations ORDER BY created_at DESC', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Serveur API démarré sur http://localhost:5000 🚀');
});
