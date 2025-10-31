import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Role from "./role.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false,  },
  password: { type: DataTypes.STRING(255), allowNull: true }, // password null initially
  config: { type: DataTypes.JSON, defaultValue: {} },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false }, // inactive until password set
  updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

User.belongsTo(Role, {
  foreignKey: {
    name: "role_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export default User;
