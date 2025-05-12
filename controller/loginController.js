const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

class loginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await admin.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "invalid credentials" });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );
      res
        .status(200)
        .json({
          message: "login successful",
          data: { user: user, token: token },
        });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "error logging in", error: err.message });
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
