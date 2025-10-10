const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello Node Js");
});
app.use("/",(req,res)=>{
    res.send("Dashboard")
})

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
