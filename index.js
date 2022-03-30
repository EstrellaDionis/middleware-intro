const express = require("express");
const app = express();
const morgan = require("morgan");

//app.use will be triggered by every request!
app.use(morgan("tiny")); //logger middleware and there are many middlewares to morgan! check docs!

app.use((req, res, next) => {
  console.log("THIS IS MY FIRST MIDDLEWARE");
  next();
  console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()");
});

app.use((req, res, next) => {
  console.log("THIS IS MY SECOND MIDDLEWARE");
  next();
  console.log("THIS IS MY SECOND MIDDLEWARE - AFTER CALLING NEXT()");
});

app.use((req, res, next) => {
  console.log("THIS IS MY THIRD MIDDLEWARE");
  next();
  console.log("THIS IS MY THIRD MIDDLEWARE - AFTER CALLING NEXT()");
});

app.get("/", (req, res) => {
  res.send("Hello im working");
});

app.get("/dogs", (req, res) => {
  res.send("Hello im woof woof");
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});
