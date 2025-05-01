const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api", productRoutes);
app.use(errorHandler);

module.exports = app; // ✅ Export app for Supertest
