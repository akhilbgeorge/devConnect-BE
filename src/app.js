const express = require("express");
const app = express();

app.get("/abc", (req, res) => {
  res.send({ firstName: "Akhil", lastName: "B George" });
});
// app.get(/^\/ab?c$/, (req, res) => {
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });
// app.get(/^\/ab+c$/, (req, res) => {
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });
// app.get(/^\/ab*cd$/, (req, res) => {
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });
// app.get(/^\/a(bc)?d$/, (req, res) => {
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });
// app.get(/^\/a(bc)+d$/, (req, res) => {
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });

// query params (/user?userId:123)
// app.get("/user", (req, res) => {
//   console.log(req.query)
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });

// dynamic routes (/user/123)
// app.get("/user/:userId", (req, res) => {
//   console.log(req.params)
//   res.send({ firstName: "Akhil", lastName: "B George" });
// });

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
