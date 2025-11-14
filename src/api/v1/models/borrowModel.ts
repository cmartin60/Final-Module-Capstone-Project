export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowedAt: string; 
  dueDate: string;
  returnedAt?: string | null;
  status: 'borrowed' | 'returned';
}

export default BorrowRecord;
