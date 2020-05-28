const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// const db = require("./db");
// const movieRouter = require("./routes/property-router");

const app = express();
const apiPort = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "client/build")));

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api", movieRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/client/build/index.html"));
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));