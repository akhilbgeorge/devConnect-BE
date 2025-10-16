const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/user",userAuth,(req, res) => {
  try {
    let user = true;
    if (!user) throw new Error();
    res.send("user found");
  } catch (err) {
    res.status(500).send("user not found");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong. Please contact support");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
