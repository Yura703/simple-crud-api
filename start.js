const server = require("./app");
require("dotenv").config();

const port = process.env.PORT || 4000; //сделать разные порты
server.listen(port, function (error) {
  if (error) {
    console.log("Error server:" + error);
  } else {
    console.log("Server is listening on port" + port);
  }
});

module.exports = server;
