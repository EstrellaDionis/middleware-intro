const express = require("express");
const app = express();
const morgan = require("morgan");

//app.use will be triggered by every request!
app.use(morgan("tiny")); //logger middleware and there are many middlewares to morgan! check docs!

//recreating what morgan does as an example of middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

//Check this out in the console to see how next works
app.use((req, res, next) => {
  console.log("THIS IS MY FIRST MIDDLEWARE");
  next();
  console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()");
});

app.use((req, res, next) => {
  console.log("THIS IS MY SECOND MIDDLEWARE");
  next();
});

app.use((req, res, next) => {
  console.log("THIS IS MY THIRD MIDDLEWARE");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello im working");
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`); //this is using req.requestTime function from app.use() which is triggered by all requests and because it loads first, this endpoint is allowed to use it.
  res.send("Hello im woof woof");
});

//404 route
app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});
