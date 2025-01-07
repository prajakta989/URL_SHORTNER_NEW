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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // if (!user) return res.status(404).json({ message: "User not found" });
      if (!user){
        return res.status(204).json({ message: "User not found" });
      } 
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, user});  //instead of response send direct token if not working
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//   exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) throw new Error("User not found");

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) throw new Error("Invalid credentials");

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         // Set the token in an HttpOnly cookie
//         res.cookie('access_token', token, {
//             httpOnly: true,     // Cookie cannot be accessed via JavaScript
//             secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
//             maxAge: 24 * 60 * 60 * 1000 // 1 day expiration in milliseconds
//         });

//         // Send response back with a success message and user data (excluding sensitive info like password)
//         res.status(200).json({ message: 'Logged in successfully', user: { ...user.toObject(), password: undefined } });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
