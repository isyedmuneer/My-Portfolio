const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "UP", message: "Backend is running smoothly!" });
});

// Contact Form Submit Route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Please fill all fields." });
    }

    // Yahan aap message console par print karwa rahe hain
    // Real-world me hum yahan se email send kar sakte hain ya database me save kar sakte hain
    console.log(`📩 New Message Received from ${name} (${email}): ${message}`);

    return res.status(200).json({ 
        success: true, 
        message: "Thank you! Message received successfully." 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on port ${PORT}`);
});