const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("hi user 1");
    next();
  },
  (req, res, next) => {
    console.log("hi user 2");
    next();
  },
  (req, res) => {
    console.log("hi user 3");
    res.send("response 3");
  },
  [
    (req, res) => {
      console.log("hi user 4");
      res.send("response 4");
    },
    (req, res) => {
      console.log("hi user 5");
      res.send("response 5");
    },
  ]
);

app.listen(3000, () => {
  "Server is successfully listening on port 3000";
});
