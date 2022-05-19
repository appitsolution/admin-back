const { Router } = require("express");
const user = Router();

user.get("/", (req, res) => {
  res.status(200);
  res.send({
    Mike: "Ok",
  });
});

module.exports = user;
