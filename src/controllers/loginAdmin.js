const { config } = require("dotenv");
config();
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

const loginAdmin = async (req, res) => {
  const data = await req.body;
  if (data.login === login && data.password === password) {
    res.status(200);
    res.send("ok");
  } else {
    res.status(404);
    res.send("login or password bad");
  }
};
module.exports = loginAdmin;
