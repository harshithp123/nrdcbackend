import express from "express";
import {
  loginUser,
  createUserByAdmin,
  setPassword,
  getCurrentUser,
  renewAccessToken,
  


} from "../controllers/authControllers.js";
import { authenticateToken, } from "../middlewares/authmiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and onboarding
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/admin/create-user:
 *   post:
 *     summary: Admin creates a new user (invite)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # uses token from Swagger Authorize
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: User created and invite sent
 */
router.post("/admin/create-user",authenticateToken, createUserByAdmin);

/**
 * @swagger
 * /api/auth/set-password:
 *   post:
 *     summary: Set password via invite link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password set successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post("/set-password", setPassword);
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # uses token from Swagger Authorize
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/me", authenticateToken, getCurrentUser);
/**
 * @swagger
 * /api/auth/renew:
 *   get:
 *     summary: Renew access token using query parameter
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Old expired or valid access token
 *     responses:
 *       200:
 *         description: New access token generated
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
 *                   example: New access token generated ✅
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
router.get("/renew", renewAccessToken);



export default router;
