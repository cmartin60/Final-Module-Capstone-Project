import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../src/api/v1/middleware/validate';
import schemas from '../src/api/v1/validation/schemas';
import { MiddlewareFunction } from '../src/api/v1/types/express';
import { HTTP_STATUS } from '../src/constants/httpConstants';

describe('Validation Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { body: {}, params: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should pass validation for valid user data', () => {
    mockReq.body = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.userSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('should fail validation for invalid user data', () => {
    mockReq.body = {
      name: '',
      email: 'not-an-email',
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.userSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining('Name cannot be empty'),
    });
  });

  it('should pass validation for valid book data', () => {
    mockReq.body = {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      copiesAvailable: 2,
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.bookSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('should fail validation for invalid book data', () => {
    mockReq.body = {
      title: '',
      author: '',
      copiesAvailable: -1,
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.bookSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining('Title cannot be empty'),
    });
  });

  it('should pass validation for valid borrow data', () => {
    mockReq.body = {
      userId: 'u_1',
      bookId: 'b_1',
      dueDate: new Date().toISOString(),
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.borrowSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('should fail validation for invalid borrow data', () => {
    mockReq.body = {
      userId: '',
      bookId: '',
    };

    const middleware: MiddlewareFunction = validateRequest(schemas.borrowSchemas.create);
    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalled();
    const jsonArg = (mockRes.json as jest.Mock).mock.calls[0][0];
    expect(jsonArg).toHaveProperty('error');
    // Joi may report empty-string errors as 'is not allowed to be empty' and also include our 'Due date is required' message
    expect(jsonArg.error).toEqual(expect.stringContaining('Due date is required'));
    expect(jsonArg.error).toEqual(expect.stringContaining('userId'));
    expect(jsonArg.error).toEqual(expect.stringContaining('bookId'));
  });
});
