// const express = require("express");
// const connectDB = require("./db/connectDB");
// require("dotenv").config();
// const formRouter = require("./routes/submitForm");
// const app = express();
// const port = 5000;

// app.use(express.json());
// app.get("/", (req, res) => res.send("Hello World!"));
// app.use("/form", formRouter);

// const start = () => {
//   try {
//     connectDB(process.env.MONGO_URI);
//     app.listen(port, () =>
//       console.log(`Example app listening on port ${port}!`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
// -----------------------------------------------------------------
const express = require("express");
const cors = require("cors"); // Import cors
const connectDB = require("./db/connectDB");
require("dotenv").config();
const formRouter = require("./routes/submitForm");
const connectSurveysDB = require("./db/connectDB");

const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

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
