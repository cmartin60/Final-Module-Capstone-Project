import { Request, Response, NextFunction } from "express";
import { Book } from "../models/bookModel";
import * as bookService from "../services/bookService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new book.
 * @route POST /books
 * @returns {Promise<void>} creation of new book.
 */
export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, author, copiesAvailable } = req.body;
        const newBook: Book = await bookService.createBook({ title, author, copiesAvailable });
        res.status(HTTP_STATUS.CREATED).json(successResponse(newBook, "Book Created"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get all books.
 * @route GET /books
 * @returns {Promise<void>} send list of all books.
 */
export const getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const books: Book[] = await bookService.getAllBooks();
        res.status(HTTP_STATUS.OK).json(successResponse(books, "Books Retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get a book by ID.
 * @route GET /books/:id
 * @returns {Promise<void>} send book data or error if id not found
 */
export const getBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const book: Book | null = await bookService.getBookById(id);
        if (!book) {
            res.status(HTTP_STATUS.NOT_FOUND).json(successResponse(null, "Book not found"));
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(book, "Book Retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Update an existing book.
 * @route PUT /books/:id
 * @returns {Promise<void>} send updated book
 */
export const updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, author, copiesAvailable } = req.body;
        const updatedBook: Book | null = await bookService.updateBook(id, { title, author, copiesAvailable });
        if (!updatedBook) {
            res.status(HTTP_STATUS.NOT_FOUND).json(successResponse(null, "Book not found"));
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(updatedBook, "Book Updated"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Delete a book.
 * @route DELETE /books/:id
 * @returns {Promise<void>} deletes a book
 */
export const deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await bookService.deleteBook(id);
        res.status(HTTP_STATUS.OK).json(successResponse(null, "Book Deleted"));
    } catch (error: unknown) {
        next(error);
    }
};

export default {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
