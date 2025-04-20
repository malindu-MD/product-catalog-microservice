const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send('Healthy');
  });
app.use('/products', require('./routes/productRoutes'));

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log("Server running malindu...");
  });
  
