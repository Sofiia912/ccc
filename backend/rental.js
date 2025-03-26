const express = require('express');
const router = express.Router();
const db = require('./db');

// Отримати всі оренди
router.get('/', async (req, res) => {
  try {
    const [rentals] = await db.query(`
      SELECT rentals.*, users.first_name, users.last_name, cars.name AS car_name
      FROM rentals
      JOIN users ON rentals.user_id = users.id
      JOIN cars ON rentals.car_id = cars.id
    `);
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні оренд' });
  }
});

// Створити нову оренду
router.post('/', async (req, res) => {
  const { user_id, car_id, start_date, end_date, total_price } = req.body;

  try {
    // Перевірка, чи авто доступне
    const [carResult] = await db.query('SELECT available FROM cars WHERE id = ?', [car_id]);
    if (carResult.length === 0 || !carResult[0].available) {
      return res.status(400).json({ error: 'Авто недоступне для оренди' });
    }

    // Створення оренди
    const [result] = await db.query(
      `INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, car_id, start_date, end_date, total_price]
    );

    // Позначити авто як недоступне
    await db.query('UPDATE cars SET available = false WHERE id = ?', [car_id]);

    res.status(201).json({ message: 'Оренду створено', rentalId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при створенні оренди' });
  }
});

// Отримати оренди для конкретного користувача
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rentals] = await db.query(
      `SELECT rentals.*, cars.name AS car_name
       FROM rentals
       JOIN cars ON rentals.car_id = cars.id
       WHERE rentals.user_id = ?`,
      [userId]
    );
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні історії оренд користувача' });
  }
});

module.exports = router;
