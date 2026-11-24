import express from "express";
import User from "../../models/User.js";
import { signToken } from "../../utils/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password.",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    console.error("Registration error:", err.message);

    res.status(400).json({
      message: err.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Can't find this user",
      });
    }

    const correctPw = await user.isCorrectPassword(
      req.body.password
    );

    if (!correctPw) {
      return res.status(400).json({
        message: "Wrong password!",
      });
    }

    const token = signToken(user);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;