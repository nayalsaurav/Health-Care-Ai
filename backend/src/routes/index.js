const express = require("express");
const router = express.Router();
const authRouter = require("./auth")

router.get("/", (req, res) => {
  res.send("Hi from api/v1");
});
router.use("/auth" , authRouter)
module.exports = router;