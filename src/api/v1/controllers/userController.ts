import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import * as userService from "../services/userService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new user.
 * @route POST /users
 * @returns {Promise<void>} creation of new user.
 */
export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { name, email } = req.body;
		const newUser: User = await userService.createUser({ name, email });
		res.status(HTTP_STATUS.CREATED).json(
			successResponse(newUser, "User Created")
		);
	} catch (error: unknown) {
		next(error);
	}
};

/**
 * @description Get all users.
 * @route GET /users
 * @returns {Promise<void>} send list of all users.
 */
export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const users: User[] = await userService.getAllUsers();
		res.status(HTTP_STATUS.OK).json(
			successResponse(users, "Users Retrieved")
		);
	} catch (error: unknown) {
		next(error);
	}
};

/**
 * @description Get a user by ID.
 * @route GET /users/:id
 * @returns {Promise<void>} send user data or error if id not found 
 */
export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const user: User | null = await userService.getUserById(id);
		if (!user) {
			res.status(HTTP_STATUS.NOT_FOUND).json(
				successResponse(null, "User not found")
			);
			return;
		}
		res.status(HTTP_STATUS.OK).json(
			successResponse(user, "User Retrieved")
		);
	} catch (error: unknown) {
		next(error);
	}
};

/**
 * @description Update an existing user.
 * @route PUT /users/:id
 * @returns {Promise<void>} send updated user
 */
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { name, email } = req.body;
		const updatedUser: User | null = await userService.updateUser(id, { name, email });
		if (!updatedUser) {
			res.status(HTTP_STATUS.NOT_FOUND).json(
				successResponse(null, "User not found")
			);
			return;
		}
		res.status(HTTP_STATUS.OK).json(
			successResponse(updatedUser, "User Updated")
		);
	} catch (error: unknown) {
		next(error);
	}
};

/**
 * @description Delete a user.
 * @route DELETE /users/:id
 * @returns {Promise<void>} deletes a user 
 */
export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		await userService.deleteUser(id);
		res.status(HTTP_STATUS.OK).json(
			successResponse(null, "User Deleted")
		);
	} catch (error: unknown) {
		next(error);
	}
};

export default {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
