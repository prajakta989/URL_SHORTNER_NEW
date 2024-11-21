// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// connectDB();

// app.use(express.json());
// // app.use('/api/auth', authRoutes);
// // app.use('/api/url', urlRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
// Middleware to parse JSON

connectDB();
app.use(express.json());

app.use('/api/auth', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});