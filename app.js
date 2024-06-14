const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const Host = process.env.Host;
const DB_URL = process.env.DB_URL;

const connectdb = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log(error);
  }
};

const dbconnection = mongoose.connection;
dbconnection.on("error", (err) => console.log("There was an error: ", err));
dbconnection.on("open", () => console.log("Connected to Database"));

connectdb();

app.use(express.json());

const usersRouter = require("./routes/index"); //connects to routing file

app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
