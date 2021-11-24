const http = require("http");
//require("dotenv").config();
const router = require("./src/router");

const server = http.createServer(function (request, response) {
  try {
    const { method, url } = request;

    switch (method) {
      case "GET":
        router.get(url, response);
        break;

      case "POST":
        router.post(request, response);
        break;

      case "PUT":
        router.put(request, response);
        break;

      case "DELETE":
        router.remove(url, response);
        break;

      default:
        response.statusCode = 404;
        response.end("Method not supported");
        break;
    }
  } catch (error) {
    response.statusCode = 500;
    response.end("Something went wrong: " + error.message);
  }
});

// const port = process.env.PORT || 4000; //сделать разные порты

// server.listen(port, function (error) {
//   if (error) {
//     console.log("Error server:" + error);
//   } else {
//     console.log("Server is listening on port" + port);
//   }
// });

module.exports = server;
