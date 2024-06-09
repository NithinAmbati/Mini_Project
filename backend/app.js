const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jobby", {});
const db = mongoose.connection;

// Define User schema
const userSchema1 = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const userSchema2 = new mongoose.Schema({
  companyName: String,
  jobRole: String,
  jobLocation: String,
  jobType: String,
  mode: String,
  stipend: String,
  companyOverview: String,
  jobDescription: String,
  qualifications: String,
  experienceLevel: String,
  educationLevel: String,
  jobPostingDate: Date,
  applicationDeadline: Date,
  applicationProcess: String,
  jobDuration: String,
  workHours: String,
  benefits: Array,
  skills: Array,
});

const userSchema3 = new mongoose.Schema({
  job_role: String,
  salary: String,
});

const userSchema4 = new mongoose.Schema({
  companyName: String,
  reviewsCount: Number,
  reviewScore: Number,
});

const User = mongoose.model("user-login", userSchema1);
const Jobs = mongoose.model("jobs", userSchema2);
const Salaries = mongoose.model("salaries", userSchema3);
const CompanyReviews = mongoose.model("company-reviews", userSchema4);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server Running on Port No: ${PORT}`);
});

// Register API
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username, emailh });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    // Create new user
    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const payload = {
      username: username,
    };
    const jwtToken = jwt.sign(payload, "Nithin");
    res.status(201).send({ jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Job Details API
app.get("/jobs", async (req, res) => {
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

// Job Post API
app.post("/jobs", async (req, res) => {
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
    benefits = [],
    skills = [],
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
    await newJob.save();
    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Get Avg Salaries API
app.get("/avg-salaries", async (req, res) => {
  const data = await Salaries.find();
  res.status(200).send(data);
});

//Get Companies Reviews API
app.get("/company-reviews", async (req, res) => {
  const data = await CompanyReviews.find();
  res.status(200).send(data);
});

//POST Company with rating
app.post("/company-reviews", async (req, res) => {
  const { companyName, rating } = req.body;
  const company = await CompanyReviews.findOne({ companyName: companyName });
  console.log(company);
  if (company === null) {
    const newCompany = new CompanyReviews({
      companyName,
      reviewScore: rating,
      reviewsCount: 1,
    });
    await newCompany.save();
  } else {
    await CompanyReviews.updateOne(
      { companyName: companyName },
      {
        $set: {
          reviewScore: company.reviewScore + rating,
          reviewsCount: company.reviewsCount + 1,
        },
      }
    );
  }
});

//OTP System
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithinambati9@gmail.com",
    pass: "nshv cokv qdpw pdzi",
  },
});

app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore.set(email, otp);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Error sending email", error });
    }
    res.status(200).send({ message: "OTP sent" });
  });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (storedOtp === otp) {
    otpStore.delete(email); // Invalidate OTP after successful verification
    res.status(200).send({ message: "OTP verified" });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
});
