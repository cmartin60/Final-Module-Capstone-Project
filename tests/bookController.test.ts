import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../src/constants/httpConstants';
import * as bookController from '../src/api/v1/controllers/bookController';
import * as bookService from '../src/api/v1/services/bookService';
import { Book } from '../src/api/v1/models/bookModel';

jest.mock('../src/api/v1/services/bookService');

describe('Book Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('createBook', () => {
    it('should handle successful creation', async () => {
      const mockBody: Omit<Book, 'id'> = {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        copiesAvailable: 3,
      };
      const mockBook: Book = { id: '1', ...mockBody };

      mockReq.body = mockBody;
      (bookService.createBook as jest.Mock).mockResolvedValue(mockBook);

      await bookController.createBook(mockReq as Request, mockRes as Response, mockNext);

      expect((mockRes.status as jest.Mock).mock.calls[0][0]).toBe(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Book Created',
        status: 'success',
        data: mockBook,
      });
    });

    it('should forward errors to next function', async () => {
      const error: Error = new Error('Service failure');
      (bookService.createBook as jest.Mock).mockRejectedValue(error);

      await bookController.createBook(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllBooks', () => {
    it('should handle successful retrieval', async () => {
      const mockBooks: Book[] = [
        { id: '1', title: 'B1', author: 'A1', copiesAvailable: 1 },
      ];

      (bookService.getAllBooks as jest.Mock).mockResolvedValue(mockBooks);

      await bookController.getAllBooks(mockReq as Request, mockRes as Response, mockNext);

      expect((mockRes.status as jest.Mock).mock.calls[0][0]).toBe(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Books Retrieved',
        status: 'success',
        data: mockBooks,
      });
    });

    it('should call next(error) when service throws', async () => {
      const error: Error = new Error('Database error');
      (bookService.getAllBooks as jest.Mock).mockRejectedValue(error);

      await bookController.getAllBooks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getBookById', () => {
    it('should handle successful retrieval', async () => {
      const mockBook: Book = { id: '1', title: 'B1', author: 'A1', copiesAvailable: 1 };

      mockReq.params = { id: '1' } as any;
      (bookService.getBookById as jest.Mock).mockResolvedValue(mockBook);

      await bookController.getBookById(mockReq as Request, mockRes as Response, mockNext);

      expect((mockRes.status as jest.Mock).mock.calls[0][0]).toBe(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Book Retrieved',
        status: 'success',
        data: mockBook,
      });
    });

    it('should forward errors when book not found', async () => {
      const error: Error = new Error('Book not found');
      mockReq.params = { id: '999' } as any;
      (bookService.getBookById as jest.Mock).mockRejectedValue(error);

      await bookController.getBookById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateBook', () => {
    it('should handle successful update', async () => {
      const mockBook: Book = { id: '1', title: 'B1', author: 'A1', copiesAvailable: 2 };

      mockReq.params = { id: '1' } as any;
      mockReq.body = { copiesAvailable: 2 } as any;
      (bookService.updateBook as jest.Mock).mockResolvedValue(mockBook);

      await bookController.updateBook(mockReq as Request, mockRes as Response, mockNext);

      expect((mockRes.status as jest.Mock).mock.calls[0][0]).toBe(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Book Updated',
        status: 'success',
        data: mockBook,
      });
    });

    it('should call next(error) when service throws', async () => {
      const error: Error = new Error('Update failed');
      mockReq.params = { id: '1' } as any;
      mockReq.body = {} as any;
      (bookService.updateBook as jest.Mock).mockRejectedValue(error);

      await bookController.updateBook(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteBook', () => {
    it('should handle successful deletion', async () => {
      mockReq.params = { id: '1' } as any;
      (bookService.deleteBook as jest.Mock).mockResolvedValue(undefined);

      await bookController.deleteBook(mockReq as Request, mockRes as Response, mockNext);

      expect((mockRes.status as jest.Mock).mock.calls[0][0]).toBe(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Book Deleted',
        status: 'success',
        data: null,
      });
    });

    it('should call next(error) when service throws', async () => {
      const error: Error = new Error('Book not found');
      mockReq.params = { id: '999' } as any;
      (bookService.deleteBook as jest.Mock).mockRejectedValue(error);

      await bookController.deleteBook(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
