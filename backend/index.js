const express = require("express");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const formRouter = require("./routes/submitForm");
const app = express();
const port = 5000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/form", formRouter);

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
