import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Role } from "../models/index.js";
import dotenv from "dotenv";
import sendMail from "../config/sendMail.js";

dotenv.config();

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, role_id } = req.body;

    // Check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(201).json({
        status: 201,
        message: "User already exists ✅",
        user: existing
      });
    }

    // Create user with initial values
    const user = await User.create({
      name,
      email,
      role_id,
      password: "",             // leave empty
      config: {},               // empty object
      is_active: false,         // inactive until password is set
      createdAt: new Date(),    // current timestamp
      createdBy: req.user.id    // admin id from token
    });

    // Generate invite JWT token for setting password
    const inviteToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const link = `${process.env.FRONTEND_URL}/set-password?token=${inviteToken}`;
    await sendMail(email, "Set your password", `<p>Click here to set your password: <a href="${link}">Set Password</a></p>`);

    res.status(200).json({
      status: 200,
      message: "User created and invite sent ✅",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// User sets password from invite link
export const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user)
      return res.status(400).json({ status: 400, message: "Invalid or expired token ❌" });

    // ✅ If user already set password
    if (user.is_active) {
      return res.status(201).json({
        status: 201,
        message: "Password already set ✅ You can log in directly.",
      });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.is_active = true;
    await user.save();

    res.status(200).json({
      status: 200,
      message: "Password set successfully ✅ You can now login.",
    });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};


// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Role });

    if (!user)
      return res.status(201).json({status:201, message: "User not found ❌" });
    if (!user.is_active)
      return res.status(201).json({status:201, message: "User has not set password yet ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(201).json({ status:201,message: "Invalid credentials ❌" });

    const accessToken = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    
 
    await user.save();

    // Exclude sensitive fields
    const { password: pw, refresh_token, ...userData } = user.toJSON();

    res.status(200).json({ status:200,message: "Login successful ✅", accessToken, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCurrentUser = (req, res) => {
  // req.user is set by authenticateToken middleware
  const { password, refresh_token, ...userData } = req.user.toJSON(); // remove sensitive fields
  res.status(200).json({ user: userData });
};
// Controller
export const renewAccessToken = async (req, res) => {
  try {
    // Get token from query params
    const oldToken = req.query.token;
    if (!oldToken)
      return res.status(401).json({ message: "Token missing ❌" });

    // Verify token ignoring expiration
    let decoded;
    try {
      decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
    } catch (err) {
      return res.status(403).json({ message: "Invalid token ❌" });
    }

    // Get user from DB
    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user || !user.is_active)
      return res.status(403).json({ message: "User not found or inactive ❌" });

    // Issue new token
    const newToken = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // new 15 min token
    );

    res.status(200).json({ status: 200, message: "New access token generated ✅", accessToken: newToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
