const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Student, Employer } = require("./startMongoose");

router.get("/student", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("dkjnafak");
    res.status(401).send("Invalid Access Token");
    return;
  }
  const jwtToken = authHeader.split(" ")[1];
  try {
    // Verify JWT token
    const payload = await jwt.verify(jwtToken, "Nithin");
    if (!payload) {
      res.status(401).send("Invalid Access Token");
      return;
    }
    const { email } = payload;
    const userDetails = await Student.findOne({ email });
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/employer", async (req, res) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).send("Invalid Access Token");
    return;
  }
  const jwtToken = authHeader.split(" ")[1];
  try {
    // Verify JWT token
    const payload = await jwt.verify(jwtToken, "Nithin");
    if (!payload) {
      res.status(401).send("Invalid Access Token");
      return;
    }
    const { email } = payload;
    const userDetails = await Employer.findOne({ email });
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
