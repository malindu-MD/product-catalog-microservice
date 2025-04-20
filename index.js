const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
app.use('/products', require('./routes/productRoutes'));

app.listen(80, () => console.log("Server running on port 80"));
  
