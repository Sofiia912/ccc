const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Отримати всіх користувачів
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, first_name, last_name, email FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні користувачів' });
  }
});

// Реєстрація
router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Користувач зареєстрований', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при реєстрації' });
  }
});

// Вхід + видача токена
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Успішний вхід',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при вході' });
  }
});

module.exports = router;
