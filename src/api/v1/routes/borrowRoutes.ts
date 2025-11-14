import express, { Router } from "express";
import * as borrowController from "../controllers/borrowController";
import { validateRequest } from "../middleware/validate";
import { borrowSchemas } from "../validation/schemas";

const router: Router = express.Router();

router.post('/', validateRequest(borrowSchemas.create), borrowController.createBorrow);
router.get('/', borrowController.getAllBorrows);
router.get('/:id', borrowController.getBorrowById);
router.put('/:id', validateRequest(borrowSchemas.update), borrowController.updateBorrow);
router.delete('/:id', borrowController.deleteBorrow);

export default router;
