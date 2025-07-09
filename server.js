const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS insumos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  cantidad INTEGER,
  categoria TEXT
)`);

// Rutas
app.get('/', (req, res) => {
  db.all("SELECT * FROM insumos", [], (err, rows) => {
    res.render('index', { insumos: rows });
  });
});

app.get('/nuevo', (req, res) => {
  res.render('form');
});

app.post('/agregar', (req, res) => {
  const { nombre, cantidad, categoria } = req.body;
  db.run("INSERT INTO insumos (nombre, cantidad, categoria) VALUES (?, ?, ?)",
    [nombre, cantidad, categoria],
    () => res.redirect('/')
  );
});

app.listen(3000, () => console.log('App corriendo en http://localhost:3000'));
