const path = require("path");

module.exports = {
  target: "node16.13",
  entry: "./start.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
};
