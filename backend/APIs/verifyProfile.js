const express = require("express");
const { Student } = require("./mongoDBConnection");
const router = express.Router();

router.get("/", async (req, res) => {
  const authorization = req.header["authorization"];
  if (!authorization) res.status(403).send("Invalid authorization");
  const jwtToken = authHeader.split(" ")[1];
  if (!jwtToken) res.status(403).send("Invalid JWT token");
  try {
    const payload = jwt.verify(jwtToken, "your_secret_key");
    const { email } = payload;
    const user = await Student.find({ email });
    console.log(user);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

module.exports = router;
