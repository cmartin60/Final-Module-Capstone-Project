import request from 'supertest';
import app from '../src/app';
import * as borrowController from '../src/api/v1/controllers/borrowController';
import { HTTP_STATUS } from '../src/constants/httpConstants';

jest.mock('../src/api/v1/controllers/borrowController', () => ({
  createBorrow: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.CREATED).send()),
  getAllBorrows: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  getBorrowById: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  updateBorrow: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  deleteBorrow: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
}));

describe('Borrow Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/v1/borrows should call getAllBorrows controller', async () => {
    await request(app).get('/api/v1/borrows/');
    expect(borrowController.getAllBorrows).toHaveBeenCalled();
  });

  it('POST /api/v1/borrows should call createBorrow controller with valid data', async () => {
    await request(app).post('/api/v1/borrows/').send({ userId: 'u1', bookId: 'b1' });
    expect(borrowController.createBorrow).toHaveBeenCalled();
  });

  it('PUT /api/v1/borrows/:id should call updateBorrow controller with valid data', async () => {
    await request(app).put('/api/v1/borrows/testId').send({ returnedAt: new Date().toISOString() });
    expect(borrowController.updateBorrow).toHaveBeenCalled();
  });

  it('DELETE /api/v1/borrows/:id should call deleteBorrow controller', async () => {
    await request(app).delete('/api/v1/borrows/testId');
    expect(borrowController.deleteBorrow).toHaveBeenCalled();
  });

  it('GET /api/v1/borrows/:id should call getBorrowById controller', async () => {
    await request(app).get('/api/v1/borrows/testId');
    expect(borrowController.getBorrowById).toHaveBeenCalled();
  });
});
