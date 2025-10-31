import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define(
  "Role",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, },
    description: { type: DataTypes.STRING(255) },
  },
  {
    tableName: "roles",
    timestamps: false, // 🔥 Disable timestamps to avoid datetime error
  }
);

export default Role;
