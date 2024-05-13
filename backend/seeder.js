const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Order.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Order.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

/*
//console.log(process.argv);

COMMAND: node seeder.js -destroy
//result:

[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\sumap\\Documents\\MERN stack projects\\E-commerce Site\\backend\\seeders.js',
  '-destroy
]
*/

if (process.argv[2] === "-destroy") {
  destroyData();
} else {
  importData();
}
//node seeder.js -import
