export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  dueAt?: string; // ISO string for simplicity
  returnedAt?: string | null; // ISO string or null
}