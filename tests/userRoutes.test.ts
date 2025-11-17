import request from 'supertest';
import app from '../src/app';
import * as userController from '../src/api/v1/controllers/userController';
import { HTTP_STATUS } from '../src/constants/httpConstants';

jest.mock('../src/api/v1/controllers/userController', () => ({
  createUser: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.CREATED).send()),
  getAllUsers: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  getUserById: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  updateUser: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
  deleteUser: jest.fn((req: any, res: any) => res.status(HTTP_STATUS.OK).send()),
}));

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/v1/users should call getAllUsers controller', async () => {
    await request(app).get('/api/v1/users/');
    expect(userController.getAllUsers).toHaveBeenCalled();
  });

  it('POST /api/v1/users should call createUser controller with valid data', async () => {
    await request(app).post('/api/v1/users/').send({ name: 'Alice', email: 'a@example.com' });
    expect(userController.createUser).toHaveBeenCalled();
  });

  it('PUT /api/v1/users/:id should call updateUser controller with valid data', async () => {
    await request(app).put('/api/v1/users/testId').send({ name: 'Bob' });
    expect(userController.updateUser).toHaveBeenCalled();
  });

  it('DELETE /api/v1/users/:id should call deleteUser controller', async () => {
    await request(app).delete('/api/v1/users/testId');
    expect(userController.deleteUser).toHaveBeenCalled();
  });

  it('GET /api/v1/users/:id should call getUserById controller', async () => {
    await request(app).get('/api/v1/users/testId');
    expect(userController.getUserById).toHaveBeenCalled();
  });
});
