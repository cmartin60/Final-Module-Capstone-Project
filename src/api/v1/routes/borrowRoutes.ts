import express, { Router } from "express";
import * as borrowController from "../controllers/borrowController";
import { validateRequest } from "../middleware/validate";
import { borrowSchemas } from "../validation/schemas";

const router: Router = express.Router();

/**
 * @openapi
 * /borrows:
 *   post:
 *     summary: Create a new Borrow record
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - dueDate
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "u1"
 *               bookId:
 *                 type: string
 *                 example: "b1"
 *               borrowedAt:
 *                 type: string
 *                 format: date-time
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Borrow record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowRecord'
 *       400:
 *         description: Invalid input data
 */
router.post(
	"/",
	validateRequest(borrowSchemas.create),
	borrowController.createBorrow
);

/**
 * @openapi
 * /borrows:
 *   get:
 *     summary: Retrieve a list of borrow records
 *     tags: [Borrows]
 *     responses:
 *       200:
 *         description: A list of borrow records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowRecord'
 */
router.get("/", borrowController.getAllBorrows);

/**
 * @openapi
 * /borrows/{id}:
 *   get:
 *     summary: Get a borrow record by ID
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borrow record ID
 *     responses:
 *       200:
 *         description: Borrow record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowRecord'
 *       404:
 *         description: Borrow record not found
 */
router.get("/:id", borrowController.getBorrowById);

/**
 * @openapi
 * /borrows/{id}:
 *   put:
 *     summary: Update an existing borrow record (e.g., mark returned)
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borrow record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnedAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [borrowed, returned]
 *     responses:
 *       200:
 *         description: Borrow record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowRecord'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Borrow record not found
 */
router.put(
	"/:id",
	validateRequest(borrowSchemas.update),
	borrowController.updateBorrow
);

/**
 * @openapi
 * /borrows/{id}:
 *   delete:
 *     summary: Delete a borrow record by ID
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borrow record ID
 *     responses:
 *       204:
 *         description: Borrow record deleted successfully (no content)
 *       404:
 *         description: Borrow record not found
 */
router.delete("/:id", borrowController.deleteBorrow);

export default router;
