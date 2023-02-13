import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import { Router } from "express";
import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { User } from "../models/User.js";

const router = Router();

// User Register Router
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check for all required fields
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required!" });

  // Check for name length
  if (name.length > 30)
    return res
      .status(400)
      .json({ error: "Name must be 30 characters or less!" });

  // Check for valid email
  const validEmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmailRegex.test(email))
    return res.status(400).json({ error: "Invalid Email!" });

  // Check for valid password
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be atleast 6 characters!" });

  try {
    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ error: "Email already registered to an account!" });
    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ name, email, password: passwordHash });
    // Save user
    const result = await newUser.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required!" });

  // Check for valid email
  const validEmailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmailRegex.test(email))
    return res.status(400).json({ error: "Invalid Email Format!" });

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });

    // If no user exists
    if (!existingUser)
      return res.status(400).json({ error: "You don't have an account!" });

    // If user exists - Decrypt password

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password does not match
    if (!matchingPassword)
      return res.status(400).json({ error: "Invalid Username or Password!" });

    // JWT AUTH
    const payload = { _id: existingUser._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const user = { ...existingUser._doc };

    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json(err.message);
  }
});

export default router;
