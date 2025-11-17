import Joi, { ObjectSchema } from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a User
 *           example: "u_12345"
 *         name:
 *           type: string
 *           description: Full name of the user
 *           example: "Alice Johnson"
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "alice@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2025-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2025-01-02T12:00:00Z"
 */
export const userSchemas: {
  create: { body: ObjectSchema };
  update: { params: ObjectSchema; body: ObjectSchema };
} = {
  create: {
    body: Joi.object({
      name: Joi.string().min(2).max(100).required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
      }),
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be valid',
      }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({ 'any.required': 'User ID is required' }),
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
    }),
  },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - copiesAvailable
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Book
 *           example: "b_98765"
 *         title:
 *           type: string
 *           description: Book title
 *           example: "The Hobbit"
 *         author:
 *           type: string
 *           description: Book author
 *           example: "J.R.R. Tolkien"
 *         copiesAvailable:
 *           type: integer
 *           description: Number of available copies
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2025-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2025-01-02T12:00:00Z"
 */
export const bookSchemas: {
  create: { body: ObjectSchema };
  update: { params: ObjectSchema; body: ObjectSchema };
} = {
  create: {
    body: Joi.object({
      title: Joi.string().min(1).required().messages({
        'any.required': 'Title is required',
        'string.empty': 'Title cannot be empty',
      }),
      author: Joi.string().min(1).required().messages({
        'any.required': 'Author is required',
        'string.empty': 'Author cannot be empty',
      }),
      copiesAvailable: Joi.number().integer().min(0).required().messages({
        'any.required': 'Copies available is required',
        'number.base': 'Copies available must be a number',
      }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({ 'any.required': 'Book ID is required' }),
    }),
    body: Joi.object({
      title: Joi.string().min(1).optional(),
      author: Joi.string().min(1).optional(),
      copiesAvailable: Joi.number().integer().min(0).optional(),
    }).min(1),
  },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     BorrowRecord:
 *       type: object
 *       required:
 *         - userId
 *         - bookId
 *         - borrowedAt
 *         - dueDate
 *       properties:
 *         id:
 *           type: string
 *           description: Unique borrow record id
 *           example: "br_001"
 *         userId:
 *           type: string
 *           description: ID of the user who borrowed the book
 *           example: "u_12345"
 *         bookId:
 *           type: string
 *           description: ID of the borrowed book
 *           example: "b_98765"
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *           description: When the book was borrowed
 *           example: "2025-03-01T09:00:00Z"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: When the book is due
 *           example: "2025-03-15T09:00:00Z"
 *         returnedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: When the book was returned (if returned)
 *           example: null
 *         status:
 *           type: string
 *           enum: [borrowed, returned]
 *           description: Current status of the borrow
 *           example: "borrowed"
 */
export const borrowSchemas: {
  create: { body: ObjectSchema };
  update: { params: ObjectSchema; body: ObjectSchema };
} = {
  create: {
    body: Joi.object({
      userId: Joi.string().required().messages({ 'any.required': 'User ID is required' }),
      bookId: Joi.string().required().messages({ 'any.required': 'Book ID is required' }),
      borrowedAt: Joi.string().isoDate().optional(),
      dueDate: Joi.string().isoDate().required().messages({ 'any.required': 'Due date is required' }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({ 'any.required': 'Borrow ID is required' }),
    }),
    body: Joi.object({
      returnedAt: Joi.string().isoDate().optional(),
      dueDate: Joi.string().isoDate().optional(),
      status: Joi.string().valid('borrowed', 'returned').optional(),
    }).min(1),
  },
};



export default { userSchemas, bookSchemas, borrowSchemas };
