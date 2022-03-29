const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny")); //logger middleware and there are many middlewares to morgan! check docs!

app.get("/", (req, res) => {
  res.send("Hello im working");
});

app.get("/dogs", (req, res) => {
  res.send("Hello im woof woof");
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});
