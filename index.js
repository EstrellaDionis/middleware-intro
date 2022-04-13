const { verify } = require("crypto");
const express = require("express");
const app = express();
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const { allowedNodeEnvironmentFlags } = require("process");

const AppError = require("./AppError");

//app.use will be triggered by every request!
app.use(morgan("tiny")); //logger middleware and there are many middlewares to morgan! check docs!

//recreating what morgan does as an example of middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

//this will only run if the endpoint attempted to be reached is /dogs
app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS");
  next();
});

//this makes every endpoint needing the password chickennugget in the query string WHICH WE NEVER WANT TO DO
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  throw new AppError("password required", 401);
};

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

app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`); //this is using req.requestTime function from app.use() which is triggered by all requests and because it loads first, this endpoint is allowed to use it.
  res.send("Hello im woof woof");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("MY SECRET IS: Sometimes I wear headphones");
});

app.get("/admin", (req, res) => {
  throw new AppError("You are not an Admin!", 403);
});

//404 route
app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

// app.use((err, req, res, next) => {
//   console.log("*******************************");
//   console.log("****************ERROR!**************");
//   console.log("*******************************");
//   next(err); //this is calling next error handling middleware which in this case is express default err handler
// });

app.use((err, req, res, next) => {
  //this is just showing that we can handle the error in our own way.
  const { status = 500, message = "Something went wrong" } = err; //the destructuring is just giving it a default value if no value is given
  res.status(status).send(message);
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});
