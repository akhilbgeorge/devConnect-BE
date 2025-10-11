const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Akhil", lastName: "B George" });
});
app.post("/user", (req, res) => {
  res.send("Data saved successfully!");
});
app.delete("/user", (req, res) => {
  res.send("Deleted successfully!");
});
app.use("/test", (req, res) => {
  res.send("testing");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
