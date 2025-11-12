import Joi, { ObjectSchema } from 'joi';

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

export default userSchemas;
