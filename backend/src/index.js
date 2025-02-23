const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hi from backend");
});

app.listen(3000, () => {
  console.log(`server is listening at port 3000 , http://localhost:3000`);
});
