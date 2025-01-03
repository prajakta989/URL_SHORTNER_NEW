const User = require("../models/User");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) => {
  const { username, email, password } = req.body;
  try {
    const existinguser = await User.findOne({email})
    if (existinguser) return res.status(409).json({ message: "Email already exists" });
  
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registeredd successfully" });
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // if (!user) return res.status(404).json({ message: "User not found" });
      if (!user) throw new Error("User not found");
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
      if (!isPasswordValid) throw new Error("Invalid credentials");
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
