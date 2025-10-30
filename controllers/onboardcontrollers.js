import jwt from "jsonwebtoken";
import sendMail from "../config/sendMail.js";
import User from "../models/user.js";
import Role from "../models/role.js";

// ✅ Helper to check Super Admin
const isSuperAdmin = (user) => user?.role_id === 1;

// ✅ Get all users (Super Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!isSuperAdmin(currentUser))
      return res.status(403).json({ message: "Access denied ❌ Admins only" });

    const users = await User.findAll({
      attributes: ["id", "name", "email", "is_active", "created_at"],
      include: [{ model: Role, attributes: ["id", "name"] }],
      order: [["id", "ASC"]],
    });

    

    res.status(200).json({
      status: 200,
      message: "Users fetched successfully ✅",
      users,

    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resendInvite = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!isSuperAdmin(currentUser))
      return res.status(403).json({ message: "Access denied ❌ Admins only" });

    const { email } = req.body;

    // Check if email provided
    if (!email)
      return res.status(400).json({ message: "Email is required ❌" });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(201).json({ status: 201, message: "User not found ❌" });

    if (user.is_active)
      return res.status(200).json({ message: "User already activated ✅" });

    // Generate new invite token (24h expiry)
    const inviteToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const link = `${process.env.FRONTEND_URL}/set-password?token=${inviteToken}`;

    await sendMail(
      user.email,
      "Set your password (Resent)",
      `<p>Hello ${user.name},</p>
       <p>Click <a href="${link}">here</a> to set your password.</p>`
    );

    res.status(200).json({
      status: 200,
      message: "Invite link resent successfully ✅",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete user (Super Admin only)
export const deleteUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!isSuperAdmin(currentUser))
      return res.status(403).json({ message: "Access denied ❌ Admins only" });

    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "User not found ❌" });



    res.status(200).json({
      status: 200,
      message: "User deleted successfully ✅",
      
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Activate or deactivate user (Super Admin only)
export const toggleUserActive = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!isSuperAdmin(currentUser))
      return res.status(403).json({ message: "Access denied ❌ Admins only" });

    const { id } = req.params;
    const user = await User.findByPk(id, { include: Role });
    if (!user) return res.status(404).json({ message: "User not found ❌" });

    user.is_active = !user.is_active;
    await user.save();

    

    res.status(200).json({
      status: 200,
      message: `User ${user.is_active ? "activated" : "deactivated"} ✅`,
      user,

    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
