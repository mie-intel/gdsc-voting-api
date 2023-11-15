const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const routes = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use("/", routes);

require("dotenv").config();

const mongooseString = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongooseString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    const database = mongoose.connection;

    database.on("error", (error) => {
      console.log(error);
    });

    database.once("connected", () => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App run in server ${port}`);
  });
});
