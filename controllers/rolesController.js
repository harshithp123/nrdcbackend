import { User, Role } from "../models/index.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name", "description"],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      status: 200,
      message: "Roles fetched successfully ✅",
      roles,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
