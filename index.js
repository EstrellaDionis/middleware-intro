const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello im working");
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});
