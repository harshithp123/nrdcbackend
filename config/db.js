// import { Sequelize } from "sequelize";

// // const sequelize = new Sequelize(
// //   "nrdc",          // DB_NAME
// //   "root",          // DB_USER
// //   "Varma@20",      // DB_PASSWORD
// //   {
// //     host: "localhost",
// //     dialect: "mysql",
// //     port: 3306,
// //     logging: true,
// //   }
// // );
// const sequelize = new Sequelize(
//   "nrdc",          // DB_NAME
//   "3ucg4x19tZoAz4T.root",          // DB_USER
//   "gJ0Hg76Ym4e31mNB",      // DB_PASSWORD
//   {
//     host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
//     dialect: "mysql",
//     port: 4000,
//     logging: true,
//   }
// );
// // Test DB connection
// sequelize.authenticate()
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch(err => console.error("❌ DB connection error:", err));

// export default sequelize;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "nrdc", // DB_NAME
  "3ucg4x19tZoAz4T.root", // DB_USER
  "gJ0Hg76Ym4e31mNB", // DB_PASSWORD
  {
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    dialect: "mysql",
    port: 4000,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // ❗ must be false for TiDB serverless
      },
    },
    logging: false,
  }
);

// ✅ Only test connection in local/dev mode (not in Vercel serverless)
if (process.env.NODE_ENV !== "production") {
  sequelize
    .authenticate()
    .then(() => console.log("✅ Database connected successfully (SSL enabled)"))
    .catch((err) => console.error("❌ DB connection error:", err));
}

export default sequelize;
