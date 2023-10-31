const express = require("express");
const path = require("node:path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8001;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace * with your allowed origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

const pathToBuild = __dirname + "/../client/";

app.use(express.static(path.join(pathToBuild, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(pathToBuild, "build", "index.html"));
});

app.use("/api/users", require("./src/routes/UserRoutes"));
app.use("/api/notes", require("./src/routes/NotesRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
