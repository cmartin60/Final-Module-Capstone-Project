import { BorrowRecord } from '../api/v1/models/borrowModel';

export const borrowRecords: BorrowRecord[] = [
  {
    id: 'r1',
    userId: 'u1',
    bookId: 'b1',
    borrowedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    returnedAt: null,
    status: 'borrowed',
  },
  {
    id: 'r2',
    userId: 'u2',
    bookId: 'b3',
    borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
    returnedAt: null,
    status: 'borrowed',
  },
  {
    id: 'r3',
    userId: 'u3',
    bookId: 'b2',
    borrowedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    returnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: 'returned',
  }
];
