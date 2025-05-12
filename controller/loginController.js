const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const Joi = require("joi");
env.config();

class loginController {
  async login(req, res) {
    try {
      // Schema validation
      const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
  
      const { error } = loginSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { email, password } = req.body;
      const user = await admin.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );
  
      // Success response
      return res.status(200).json({
        message: "Login successful",
        data: {
          user: {
            id: user._id,
            email: user.email,
            name: user.name, 
          },
          token,
        },
      });
  
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({
        message: "Error logging in",
        error: err.message,
      });
    }
  }
  async verifyToken(req, res, next) {   
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to authenticate token" });
      }
      next();
    });
  }
}

module.exports = new loginController();
