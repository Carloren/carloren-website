const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS doblajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    video TEXT,
    mainCharacter TEXT
  )`);

  // Insert sample data if table is empty
  db.get('SELECT COUNT(*) as count FROM doblajes', (err, row) => {
    if (row.count === 0) {
      const sampleData = [
        { title: 'Breaking Bad', year: 2008, category: 'Series', image: 'breaking-bad.jpg', video: '', mainCharacter: 'Walter White' },
        { title: 'The Godfather', year: 1972, category: 'Películas', image: 'godfather.jpg', video: '', mainCharacter: 'Vito Corleone' },
        { title: 'Planet Earth', year: 2006, category: 'Documentales', image: 'planet-earth.jpg', video: '', mainCharacter: 'Narrador' },
        { title: 'Comercial Coca-Cola', year: 2022, category: 'Locuciones', image: 'coca-cola.jpg', video: '', mainCharacter: 'Voz en Off' },
        { title: 'El Quijote', year: 2021, category: 'Audiolibros', image: 'quijote.jpg', video: '', mainCharacter: 'Don Quijote' },
        { title: 'Game of Thrones', year: 2011, category: 'Series', image: 'got.jpg', video: '', mainCharacter: 'Tyrion Lannister' },
        { title: 'Inception', year: 2010, category: 'Películas', image: 'inception.jpg', video: '', mainCharacter: 'Cobb' },
        { title: 'Blue Planet II', year: 2017, category: 'Documentales', image: 'blue-planet.jpg', video: '', mainCharacter: 'Narrador' },
        { title: 'Anuncio Nike', year: 2023, category: 'Locuciones', image: 'nike.jpg', video: '', mainCharacter: 'Voz en Off' },
        { title: 'Harry Potter y la Piedra Filosofal', year: 2020, category: 'Audiolibros', image: 'harry-potter.jpg', video: '', mainCharacter: 'Harry Potter' }
      ];

      const stmt = db.prepare('INSERT INTO doblajes (title, year, category, image, video, mainCharacter) VALUES (?, ?, ?, ?, ?, ?)');
      sampleData.forEach(item => {
        stmt.run(item.title, item.year, item.category, item.image, item.video, item.mainCharacter);
      });
      stmt.finalize();
      console.log('Sample data inserted');
    }
  });
});

// API endpoint with filters
app.get('/api/doblajes', (req, res) => {
  const { year, title, category } = req.query;
  
  let query = 'SELECT * FROM doblajes WHERE 1=1';
  const params = [];

  if (year) {
    query += ' AND year = ?';
    params.push(year);
  }

  if (title) {
    query += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  query += ' ORDER BY year DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM doblajes ORDER BY category', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.category));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});
