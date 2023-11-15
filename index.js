const express = require("express");
const mongoose = require("mongoose");
const port = 3000;

require("dotenv").config();

const mongooseString = process.env.DATABASE_URL;

mongoose.connect(mongooseString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

const routes = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`App run in server ${port}`);
});
