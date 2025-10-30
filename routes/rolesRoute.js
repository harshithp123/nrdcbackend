// src/routes/roleRoutes.js
import express from "express";
import { getRoles } from "../controllers/rolesController.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";

const rolesrouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []  # Uses token from Swagger Authorize
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Roles fetched successfully ✅
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: admin
 *                       description:
 *                         type: string
 *                         example: Administrator with full access
 */
rolesrouter.get("/", authenticateToken, getRoles);

export default rolesrouter;
