import { QuerySnapshot, DocumentData, DocumentSnapshot } from "firebase-admin/firestore";
import { BorrowRecord } from "../models/borrowModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "borrows";

/**
 * Retrieves all borrow records from Firestore
 */
export const getAllBorrows = async (): Promise<BorrowRecord[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const records: BorrowRecord[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: doc.id,
            ...data,
        } as BorrowRecord;
    });
    return records;
};

/**
 * Creates a new borrow record
 */
export const createBorrow = async (
    recordData: Omit<BorrowRecord, "id">
): Promise<BorrowRecord> => {
    const newRecord: Partial<BorrowRecord> = { ...recordData };
    const recordId: string = await createDocument<BorrowRecord>(COLLECTION, newRecord);
    return structuredClone({ id: recordId, ...newRecord } as BorrowRecord);
};

/**
 * Retrieves a single borrow record by ID from Firestore
 */
export const getBorrowById = async (id: string): Promise<BorrowRecord | null> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        return null;
    }

    const data: DocumentData | undefined = doc.data();
    const record: BorrowRecord = {
        id: doc.id,
        ...data,
    } as BorrowRecord;

    return structuredClone(record);
};

/**
 * Updates an existing borrow record
 */
export const updateBorrow = async (
    id: string,
    recordData: Partial<Omit<BorrowRecord, "id">>
): Promise<BorrowRecord | null> => {
    const existing: BorrowRecord | null = await getBorrowById(id);
    if (!existing) {
        return null;
    }

    const updated: BorrowRecord = { ...existing };
    if (recordData.userId !== undefined) updated.userId = recordData.userId;
    if (recordData.bookId !== undefined) updated.bookId = recordData.bookId;
    if (recordData.borrowedAt !== undefined) updated.borrowedAt = recordData.borrowedAt;
    if (recordData.dueDate !== undefined) updated.dueDate = recordData.dueDate;
    if (recordData.returnedAt !== undefined) updated.returnedAt = recordData.returnedAt as string | null;
    if (recordData.status !== undefined) updated.status = recordData.status as "borrowed" | "returned";

    await updateDocument<BorrowRecord>(COLLECTION, id, updated);
    return structuredClone(updated);
};

/**
 * Deletes a borrow record from Firestore
 */
export const deleteBorrow = async (id: string): Promise<void> => {
    const record = await getBorrowById(id);
    if (!record) {
        throw new Error(`Borrow record with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};
