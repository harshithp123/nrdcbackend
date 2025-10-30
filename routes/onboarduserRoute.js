import express from "express";
import { authenticateToken } from "../middlewares/authmiddleware.js";
import { getAllUsers, resendInvite, deleteUser } from "../controllers/onboardcontrollers.js";

const onboardRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Onboard
 *   description: Admin onboarding management
 */

/**
 * @swagger
 * /api/onboard/users:
 *   get:
 *     summary: Get all users
 *     tags: [Onboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
onboardRouter.get("/users", authenticateToken, getAllUsers);

/**
 * @swagger
 * /api/onboard/resend-invite:
 *   post:
 *     summary: Resend invite link to inactive user
 *     tags: [Onboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Invite resent
 */
onboardRouter.post("/resend-invite", authenticateToken, resendInvite);

/**
 * @swagger
 * /api/onboard/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Onboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
onboardRouter.delete("/user/:id", authenticateToken, deleteUser);

export default onboardRouter;
