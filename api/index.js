const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
const uploadMiddleware = multer({ dest: "uploads/" });

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

const salt = bcrypt.genSaltSync(10);
const secret = "asdfdsfasdfsadads";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
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
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
app.get("/post", async (req, res) => {
  res.json(await Post.find().populate("author", ["username"]));
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    // if (err) throw err;
    res.json(info);
  });
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
);
