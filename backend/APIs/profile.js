const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Student } = require("./startMongoose");

router.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).send("Invalid Access Token");
    return;
  }
  const jwtToken = authHeader.split(" ")[1];
  try {
    // Verify JWT token
    const payload = jwt.verify(jwtToken, "Nithin");
    if (!payload) {
      res.status(401).send("Invalid Access Token");
      return;
    }
    const { email } = payload;
    const userDetails = await Student.findOne({ email });
    console.log(userDetails);
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
