const express = require("express");
const cors = require("cors");
const user = require("./routing/user");
const logger = require("./logger");
const app = express();

// cors
app.use(cors());
app.use(logger);

app.use("/user", user);

app.use((req, res) => {
  res.status(404);
  res.send("Not Found");
});

module.exports = app;
