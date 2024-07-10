const express = require("express");
const { Student } = require("./mongoDBConnection");
const router = express.Router();

router.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send("Invalid Access Token");
    return;
  }
  const jwtToken = authHeader.split(" ")[1];
  if (!jwtToken) res.status(403).send("Invalid JWT token");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { email } = payload;
    const user = await Student.find({ email });
    console.log(user);
    res.status(200).send("true");
  } catch (error) {
    res.status(403).send(error.message);
  }
});

module.exports = router;
