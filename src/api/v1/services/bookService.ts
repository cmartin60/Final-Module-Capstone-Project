import { QuerySnapshot, DocumentData, DocumentSnapshot } from "firebase-admin/firestore";
import { Book } from "../models/bookModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "books";

/**
 * Retrieves all books
 */
export const getAllBooks = async (): Promise<Book[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const books: Book[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: doc.id,
            ...data,
        } as Book;
    });
    return books;
};

/**
 * Creates a new book
 */
export const createBook = async (bookData: Omit<Book, "id">): Promise<Book> => {
    const newBook: Partial<Book> = { ...bookData };
    const bookId: string = await createDocument<Book>(COLLECTION, newBook);
    return structuredClone({ id: bookId, ...newBook } as Book);
};

/**
 * Retrieves a single book by ID from Firestore
 */
export const getBookById = async (id: string): Promise<Book | null> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        return null;
    }

    const data: DocumentData | undefined = doc.data();
    const book: Book = {
        id: doc.id,
        ...data,
    } as Book;

    return structuredClone(book);
};

/**
 * Updates an existing book
 */
export const updateBook = async (
    id: string,
    bookData: Partial<Omit<Book, "id">>
): Promise<Book | null> => {
    const book: Book | null = await getBookById(id);
    if (!book) {
        return null;
    }

    const updatedBook: Book = { ...book };
    if (bookData.title !== undefined) updatedBook.title = bookData.title;
    if (bookData.author !== undefined) updatedBook.author = bookData.author;
    if (bookData.copiesAvailable !== undefined) updatedBook.copiesAvailable = bookData.copiesAvailable;

    await updateDocument<Book>(COLLECTION, id, updatedBook);
    return structuredClone(updatedBook);
};

/**
 * Deletes a book from Firestore
 */
export const deleteBook = async (id: string): Promise<void> => {
    const book = await getBookById(id);
    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};

