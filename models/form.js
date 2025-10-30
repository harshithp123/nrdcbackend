// models/form.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Form = sequelize.define(
  "Form",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    form_data: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: { isValidJson(value) { JSON.stringify(value); } },
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "pending", // pending | approved | rejected etc.
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "forms",
    timestamps: false,
  }
);

Form.belongsTo(User, { foreignKey: "user_id" });

export default Form;
