import Joi, { ObjectSchema } from 'joi';

//User Schemas
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

//Book Schemas
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

// Borrow Schemas
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
