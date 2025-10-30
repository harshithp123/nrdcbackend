import sequelize from "../config/db.js";
import User from "./user.js";
import Role from "./role.js";

const dbInit = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected ✅");
    
    // Sync tables (use { force: true } to drop & recreate for dev)
    await sequelize.sync({ alter: true });
    console.log("Models synced with DB ✅");
  } catch (err) {
    console.error("Sequelize connection error ❌", err);
  }
};

export { sequelize, User, Role, dbInit };
