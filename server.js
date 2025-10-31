// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";  // import cors
// import { dbInit } from "./models/index.js";
// import authRoutes from "./routes/authRouter.js";
// import { swaggerUi, swaggerSpec } from "./swaggers.js";
// import rolesrouter from "./routes/rolesRoute.js";
// import onboardRouter from "./routes/onboarduserRoute.js";
// import Formrouter from "./routes/formRoutes.js";

// dotenv.config();
// const app = express();

// app.use(
//   cors({
//     origin: "*", // allow all origins
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow all methods
//     allowedHeaders: "*", // allow all headers
//   })
// );

// // Parse JSON
// app.use(express.json());

// // Swagger route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Auth routes
// app.use("/api/auth", authRoutes);
// //roles
// app.use("/api/roles",  rolesrouter);
// //onboard
// app.use("/api/onboard",onboardRouter);
// //forms
// app.use("/api/forms",Formrouter);
// // Test route
// app.get("/", (req, res) => res.send("MCP Node.js Sequelize API running 🚀"));

// // Initialize DB
// dbInit();

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";  // import cors
// import { dbInit } from "./models/index.js";
// import authRoutes from "./routes/authRouter.js";
// import { swaggerUi, swaggerSpec } from "./swaggers.js";
// import rolesrouter from "./routes/rolesRoute.js";
// import onboardRouter from "./routes/onboarduserRoute.js";
// import Formrouter from "./routes/formRoutes.js";

// dotenv.config();
// const app = express();

// app.use(
//   cors({
//     origin: "*", // allow all origins
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow all methods
//     allowedHeaders: "*", // allow all headers
//   })
// );

// // Parse JSON
// app.use(express.json());

// // Swagger route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Auth routes
// app.use("/api/auth", authRoutes);
// //roles
// app.use("/api/roles",  rolesrouter);
// //onboard
// app.use("/api/onboard",onboardRouter);
// //forms
// app.use("/api/forms",Formrouter);
// // Test route
// app.get("/", (req, res) => res.send("MCP Node.js Sequelize API running 🚀"));

// // Initialize DB
// dbInit();

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbInit } from "./models/index.js";
import authRoutes from "./routes/authRouter.js";
import { swaggerUi, swaggerSpec } from "./swaggers.js";
import rolesrouter from "./routes/rolesRoute.js";
import onboardRouter from "./routes/onboarduserRoute.js";
import Formrouter from "./routes/formRoutes.js";

dotenv.config();
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
  })
);

// Middleware
app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", rolesrouter);
app.use("/api/onboard", onboardRouter);
app.use("/api/forms", Formrouter);

// Test route
app.get("/", (req, res) => res.send("MCP Node.js Sequelize API running 🚀"));

// ✅ Initialize DB and start server
const PORT = process.env.PORT || 5000;

dbInit().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
