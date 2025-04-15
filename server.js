const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = './data.json';
let leakData = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : [];

app.use(express.static('public'));
app.use(express.json());

// Save new leak event
app.post('/alert', (req, res) => {
  const timestamp = new Date().toISOString();
  leakData.push(timestamp);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leakData, null, 2));
  console.log(`Leak Recorded: ${timestamp}`);
  res.json({ message: 'Leak recorded', timestamp });
});

// Get all leak data
app.get('/data', (req, res) => {
  res.json(leakData);
});

const PORT = process.env.PORT || 10000;  // ✅ Keep only this
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

