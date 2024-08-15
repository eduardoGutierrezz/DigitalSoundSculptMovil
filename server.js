const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dss',
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Endpoint de registro
app.post('/api/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa tu nombre, correo electrónico y contraseña.' });
  }

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos con la contraseña encriptada
    db.query('INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)', [nombre, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error al guardar el usuario en la base de datos:', err);
        return res.status(500).json({ message: 'Error al guardar el usuario en la base de datos.' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ message: 'Error al encriptar la contraseña.' });
  }
});

// Endpoint de inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa tu correo electrónico y contraseña.' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en la consulta a la base de datos.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(500).json({ message: 'Error al verificar la contraseña.' });
      }

      if (isMatch) {
        const jwtSecret = process.env.JWT_SECRET || 'tu_clave_secreta';
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso.', token });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
