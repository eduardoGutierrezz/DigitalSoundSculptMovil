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
  const { nombre, email, password, birthdate, location, generoMusical, preset } = req.body;

  if (!nombre || !email || !password || !birthdate || !location || !generoMusical || !preset) {
    return res.status(400).json({ message: 'Por favor ingresa todos los datos.' });
  }

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos con la contraseña encriptada
    db.query('INSERT INTO usuarios (name, email, password, birthdate, location, generoMusical, presets) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, email, hashedPassword, birthdate, location, generoMusical, preset], (err, results) => {
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

  // Middleware para verificar el token JWT//////////////////////////////////////////////////////////////////////////////////////////////////
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  const jwtSecret = process.env.JWT_SECRET || 'tu_clave_secreta';
  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Endpoint para obtener el perfil del usuario
app.get('/api/profile', verifyToken, (req, res) => {
  const userId = req.userId;

  db.query('SELECT name, email, birthdate, location, generoMusical FROM usuarios WHERE id = ?', [userId], (err, results) => {


    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en la consulta a la base de datos.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(results[0]);
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
