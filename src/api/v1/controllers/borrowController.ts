import { Request, Response, NextFunction } from "express";
import { BorrowRecord } from "../models/borrowRecordModel";
import * as borrowService from "../services/borrowService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new borrow record.
 * @route POST /borrows
 */
export const createBorrow = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId, bookId, borrowedAt, dueDate } = req.body;
        const newRecord: BorrowRecord = await borrowService.createBorrow({
            userId,
            bookId,
            borrowedAt: borrowedAt ?? new Date().toISOString(),
            dueDate,
            returnedAt: null,
            status: "borrowed",
        } as any);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newRecord, "Borrow record created"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get all borrow records.
 * @route GET /borrows
 */
export const getAllBorrows = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const records: BorrowRecord[] = await borrowService.getAllBorrows();
        res.status(HTTP_STATUS.OK).json(successResponse(records, "Borrow records retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get a borrow record by ID.
 * @route GET /borrows/:id
 */
export const getBorrowById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const record: BorrowRecord | null = await borrowService.getBorrowById(id);
        if (!record) {
            res.status(HTTP_STATUS.NOT_FOUND).json(successResponse(null, "Borrow record not found"));
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(record, "Borrow record retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Update a borrow record (e.g., mark returned).
 * @route PUT /borrows/:id
 */
export const updateBorrow = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updated: BorrowRecord | null = await borrowService.updateBorrow(id, req.body);
        if (!updated) {
            res.status(HTTP_STATUS.NOT_FOUND).json(successResponse(null, "Borrow record not found"));
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(updated, "Borrow record updated"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Delete a borrow record.
 * @route DELETE /borrows/:id
 */
export const deleteBorrow = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await borrowService.deleteBorrow(id);
        res.status(HTTP_STATUS.OK).json(successResponse(null, "Borrow record deleted"));
    } catch (error: unknown) {
        next(error);
    }
};

export default {
    createBorrow,
    getAllBorrows,
    getBorrowById,
    updateBorrow,
    deleteBorrow,
};
