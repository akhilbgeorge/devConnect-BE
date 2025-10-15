const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("user login");
});

app.get("/admin/data", (req, res) => {
  res.send("admin data");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("user data");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
