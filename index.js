const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

require("dotenv").config();

const mongooseString = process.env.DATABASE_URL;

mongoose.connect(mongooseString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

const routes = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use("/api", routes);

database.once("connected", () => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`App run in server ${port}`);
  });
});
