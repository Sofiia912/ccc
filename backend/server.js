const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const carRoutes = require('./car');
const userRoutes = require('./user');
const rentalRoutes = require('./rental');

app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
