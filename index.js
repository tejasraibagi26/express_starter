// imports

const express = require("express");
const cors = require("cors");
const config = require("config");
const logger = require("morgan");

// middlewares
const auth = require("./middlewares/auth");
const error = require("./middlewares/error");

const Auth = require("./routes/api/Auth");

// initialize express app
app = express();
// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// logger
app.use(logger("common"));

// health check route
app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    message: "Health check successful",
  })
);
// routes
app.use("/api/v1/auth", Auth);
// app.use("/api/v1/<...>", auth, Media);

// error handling middleware
app.use(error);

// set up port for running server
const port = config.get("PORT");
console.log(process.env.NODE_ENV);

app.listen(port, () =>
    console.log(`Server is listening at http://localhost:${port}`)
  );

