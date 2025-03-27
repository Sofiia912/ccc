const express = require('express');
const router = express.Router();
const db = require('./db');
const auth = require('./auth'); // middleware для токена

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

// Створити оренду (авторизований користувач)
router.post('/', auth, async (req, res) => {
  const { car_id, start_date, end_date, total_price } = req.body;
  const user_id = req.user.id;

  try {
    const [car] = await db.query('SELECT available FROM cars WHERE id = ?', [car_id]);
    if (!car.length || !car[0].available) {
      return res.status(400).json({ error: 'Автівка недоступна' });
    }

    const [result] = await db.query(
      `INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, car_id, start_date, end_date, total_price]
    );

    await db.query('UPDATE cars SET available = false WHERE id = ?', [car_id]);

    res.status(201).json({ message: 'Оренду створено', rentalId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при створенні оренди' });
  }
});

// Отримати оренди для конкретного користувача
router.get('/user/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  if (parseInt(userId) !== req.user.id) {
    return res.status(403).json({ error: 'Доступ заборонено' });
  }

  try {
    const [rentals] = await db.query(
      `SELECT rentals.*, cars.name AS car_name, cars.image_url
       FROM rentals
       JOIN cars ON rentals.car_id = cars.id
       WHERE rentals.user_id = ?`,
      [userId]
    );
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні оренд користувача' });
  }
});

module.exports = router;
