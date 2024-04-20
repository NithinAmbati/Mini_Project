// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors"); // Import cors middleware

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = 3000;

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/jobby", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// // Define User schema
// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });
// const User = mongoose.model("user-logins", UserSchema);

// // Use cors middleware

// app.get("/", async (request, response) => {
//   try {
//     const users = await User.find();
//     console.log(users);
//     response.status(200).send(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     response.status(500).send("Internal Server Error");
//   }
// });

// // Register route
// app.post("/register", async (request, response) => {
//   console.log(request.body);
//   const { username, password } = request.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({
//       username: username,
//       password: password,
//     });
//     if (existingUser) {
//       response.status(400).send("User already exists");
//       return;
//     }

//     // Create new user
//     const newUser = new User({ username: username, password: password });
//     await newUser.save();

//     response.status(200).send("Registration successful");
//   } catch (error) {
//     console.error("Error registering user:", error);
//     response.status(500).send("Error");
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/jobby", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define User schema
const userSchema1 = new mongoose.Schema({
  username: String,
  password: String,
});

const userSchema2 = new mongoose.Schema({
  companyName: String,
  location: String,
  rating: Number,
  package: Number,
  description: String,
});

const User = mongoose.model("user-login", userSchema1);
const Jobs = mongoose.model("job-listings", userSchema2);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port No: ${PORT}`);
});

// Register API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(200).send("Registration Successful");
  } catch (error) {
    console.error("Error registering user:", error);
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
    console.log(jwtToken);
    res.status(201).send({ jwtToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Job Details API
app.get("/jobs-list", async (req, res) => {
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
    console.log(jobListings);
    res.status(200).send(jobListings);
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).send("Internal Server Error");
  }
});
