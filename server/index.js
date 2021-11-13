const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const router = require("./Routes/index.js");
const db = require("./database");
require("dotenv").config();
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.static(path.join(__dirname, "../build")));
server.use("/api", router);

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
