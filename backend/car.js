const express = require('express');
const router = express.Router();
const db = require('./db');

// Отримати всі авто (з автоматичним поверненням)
router.get('/', async (req, res) => {
  try {
    // Автоматично повертаємо автівки, якщо дата оренди минула
    await db.query(`
      UPDATE cars
      SET available = true
      WHERE id IN (
        SELECT car_id FROM rentals
        WHERE end_date < CURDATE()
      )
    `);

    const [cars] = await db.query('SELECT * FROM cars');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні автівок' });
  }
});

// Отримати конкретну автівку за ID
router.get('/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    const [cars] = await db.query('SELECT * FROM cars WHERE id = ?', [carId]);

    if (cars.length === 0) {
      return res.status(404).json({ error: 'Автівку не знайдено' });
    }

    res.json(cars[0]);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні автівки' });
  }
});

// Додати нову автівку
router.post('/', async (req, res) => {
  const {
    brand,
    model,
    name,
    fuel_type,
    engine,
    year,
    price_per_day,
    image_url,
    available,
    transmission,    
    passengers,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO cars 
      (brand, model, name, fuel_type, engine, year, price_per_day, image_url, available, transmission, passengers) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, model, name, fuel_type, engine, year, price_per_day, image_url, available ?? true, transmission, passengers]
    );
    res.json({ message: 'Автівку додано', carId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при додаванні автівки' });
  }
});

// Редагувати автівку
router.put('/:id', async (req, res) => {
  const carId = req.params.id;
  const {
    brand,
    model,
    name,
    fuel_type,
    engine,
    year,
    price_per_day,
    image_url,
    available,
    transmission,
    passengers,
  } = req.body;

  try {
    await db.query(
      `UPDATE cars 
       SET brand = ?, model = ?, name = ?, fuel_type = ?, engine = ?, year = ?, 
           price_per_day = ?, image_url = ?, available = ?, transmission = ?, passengers = ?
       WHERE id = ?`,
      [brand, model, name, fuel_type, engine, year, price_per_day, image_url, available, transmission, passengers, carId]
    );
    res.json({ message: 'Автівку оновлено' });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при оновленні автівки' });
  }
});


// Видалити автівку
router.delete('/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    await db.query('DELETE FROM cars WHERE id = ?', [carId]);
    res.json({ message: 'Автівку видалено' });
  } catch (err) {
    res.status(500).json({ error: 'Помилка при видаленні автівки' });
  }
});

module.exports = router;