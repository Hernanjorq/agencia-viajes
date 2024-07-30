const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tupassword',
  database: 'semana8'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para buscar vuelos por destino y fecha
app.get('/api/vuelos', (req, res) => {
  const { destino, fecha } = req.query;
  const sql = 'SELECT * FROM Vuelos WHERE destino = ? AND fecha = ?';
  db.query(sql, [destino, fecha], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
