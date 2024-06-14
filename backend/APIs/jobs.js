const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Jobs, Employer } = require("./startMongoose");

router.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
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

    // Query job listings
    const jobListings = await Jobs.find(); // Replace with actual query to MongoDB
    res.status(200).send(jobListings);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send("Invalid Access Token");
    return;
  }
  const jwtToken = authHeader.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(jwtToken, "Nithin");
  } catch (error) {
    res.status(401).send("Invalid Access Token");
    return;
  }
  const { email } = payload;
  const {
    companyName,
    jobRole,
    jobLocation,
    jobType,
    mode,
    stipend,
    companyOverview,
    jobDescription,
    qualifications,
    experienceLevel,
    educationLevel,
    jobPostingDate,
    applicationDeadline,
    applicationProcess,
    jobDuration,
    workHours,
    benefits,
    skills,
  } = req.body;

  try {
    const newJob = new Jobs({
      companyName,
      jobRole,
      jobLocation,
      jobType,
      mode,
      stipend,
      companyOverview,
      jobDescription,
      qualifications,
      experienceLevel,
      educationLevel,
      jobPostingDate,
      applicationDeadline,
      applicationProcess,
      jobDuration,
      workHours,
      benefits,
      skills,
    });

    console.log(req.body);
    await newJob.save();

    // Update the document by adding the new job to the jobsPosted array
    await Employer.updateOne(
      { email: email },
      { $push: { jobsPosted: newJob._id } } // Assuming you want to store job IDs in the array
    );

    res.status(200).send("Job Posted successfully");
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Jobs Detailed API
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Jobs.findOne({ _id: id });
  res.status(200).send(job);
});

module.exports = router;
