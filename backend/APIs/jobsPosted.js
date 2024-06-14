const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Employer, Jobs } = require("./startMongoose");

router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const jwtToken = authHeader.split(" ")[1];
  if (!jwtToken) {
    return res.status(401).send("JWT token missing");
  }

  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    if (!payload) {
      return res.status(401).send("Invalid token payload");
    }

    const { email } = payload;

    // const employer = await Employer.findOne({ email });
    // if (!employer) {
    //   return res.status(404).send("Employer not found");
    // }
    // intersectiong jobs with employer.jobsPosted
    const jobs = await Jobs.find({ postedBy: email });
    return res.status(200).send(jobs);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid access token");
  }
});

module.exports = router;
