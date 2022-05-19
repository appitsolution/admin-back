const server = require("./src/server");

server.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Start server port: 3000");
});
