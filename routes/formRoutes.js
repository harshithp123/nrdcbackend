import express from "express";
import {
  createForm,
  updateForm,
  deleteForm,
  getAllForms,
  getFormById,
} from "../controllers/formController.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";

const formRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: Form management endpoints
 */

/**
 * @swagger
 * /api/forms:
 *   post:
 *     summary: Create a new form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               form_data:
 *                 type: object
 *                 example: { "field1": "value1", "field2": "value2" }
 *     responses:
 *       200:
 *         description: Form created successfully
 */
formRouter.post("/", authenticateToken, createForm);

/**
 * @swagger
 * /api/forms/{id}:
 *   put:
 *     summary: Update form data or status
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Form ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               form_data:
 *                 type: object
 *                 example: { "field1": "newValue" }
 *               status:
 *                 type: string
 *                 example: approved
 *     responses:
 *       200:
 *         description: Form updated successfully
 */
formRouter.put("/:id", authenticateToken, updateForm);

/**
 * @swagger
 * /api/forms/{id}:
 *   delete:
 *     summary: Soft delete a form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Form deleted successfully
 */
formRouter.delete("/:id", authenticateToken, deleteForm);

/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Get all forms (Admins only)
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all forms
 */
formRouter.get("/", authenticateToken, getAllForms);

/**
 * @swagger
 * /api/forms/{id}:
 *   get:
 *     summary: Get form by ID
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Form details
 */
formRouter.get("/:id", authenticateToken, getFormById);

export default formRouter;
