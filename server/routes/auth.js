const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
require("dotenv");

// @route GET api/auth
// description Check if user is login in
// @access Public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/register
// @description Register user
// @access public
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });
    }

    // check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // Ok
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();

    // access tooken

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @description login user
// @access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //   check missing username or password
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username or password" });
  }

  try {
    //   check for exist username
    user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // check password if exists username
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or  password" });

    // access tooken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
