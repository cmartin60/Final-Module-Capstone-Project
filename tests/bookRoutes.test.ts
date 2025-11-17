import request from 'supertest';
import app from '../src/app';
import * as bookController from '../src/api/v1/controllers/bookController';
import { HTTP_STATUS } from '../src/constants/httpConstants';

jest.mock('../src/api/v1/controllers/bookController', () => ({
  createBook: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.CREATED).send()),
  getAllBooks: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  getBookById: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  updateBook: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  deleteBook: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
}));

describe('Book Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/v1/books should call getAllBooks controller', async () => {
    await request(app).get('/api/v1/books/');
    expect(bookController.getAllBooks).toHaveBeenCalled();
  });

  it('POST /api/v1/books should call createBook controller with valid data', async () => {
    await request(app).post('/api/v1/books/').send({ title: 'X', author: 'Y', copiesAvailable: 1 });
    expect(bookController.createBook).toHaveBeenCalled();
  });

  it('PUT /api/v1/books/:id should call updateBook controller with valid data', async () => {
    await request(app).put('/api/v1/books/testId').send({ title: 'New' });
    expect(bookController.updateBook).toHaveBeenCalled();
  });

  it('DELETE /api/v1/books/:id should call deleteBook controller', async () => {
    await request(app).delete('/api/v1/books/testId');
    expect(bookController.deleteBook).toHaveBeenCalled();
  });

  it('GET /api/v1/books/:id should call getBookById controller', async () => {
    await request(app).get('/api/v1/books/testId');
    expect(bookController.getBookById).toHaveBeenCalled();
  });
});
