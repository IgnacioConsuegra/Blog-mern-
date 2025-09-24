const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If the password is valid, respond with success
    res.status(200).json({ message: "Login successful", user: userDoc });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
);
