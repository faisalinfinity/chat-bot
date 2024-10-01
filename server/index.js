// server.js (Node.js with Express)
const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static chatbot page
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch categories
app.get('/api/categories', (req, res) => {
  const results = [];
  fs.createReadStream('corrected_final_home_improvement_services.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

// Endpoint for chatbot page (rendered via iframe)
app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
