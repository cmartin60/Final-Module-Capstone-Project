import express, { Router } from "express";
import * as bookController from "../controllers/bookController";
import { validateRequest } from "../middleware/validate";
import { bookSchemas } from "../validation/schemas";

const router: Router = express.Router();

router.post('/', validateRequest(bookSchemas.create), bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', validateRequest(bookSchemas.update), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
