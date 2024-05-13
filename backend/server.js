const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const products = require("./data/products");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");

connectDB();
const app = express();
app.use(cors());

app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
