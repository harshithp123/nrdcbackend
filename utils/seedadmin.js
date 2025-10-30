import bcrypt from "bcryptjs";
import { User, Role } from "../models/index.js"; // adjust path
import sequelize from "../config/db.js"; // your sequelize instance

const createAdmin = async () => {
  try {
    await sequelize.sync({ force: false }); // ensure tables exist

    // Check if admin role exists
    let adminRole = await Role.findOne({ where: { name: "Admin" } });
    if (!adminRole) {
      adminRole = await Role.create({ name: "Admin" });
    }

    // Check if admin user exists
    const existing = await User.findOne({ where: { email: "admin@example.com" } });
    if (existing) {
      console.log("Admin user already exists ✅");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role_id: adminRole.id,
      is_active: true,
    });

    console.log("Admin user created ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
