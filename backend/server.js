const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder for Home Assistant integration
// app.get('/api/entities', ...);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
