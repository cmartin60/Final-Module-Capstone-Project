import * as bookService from "../src/api/v1/services/bookService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Book } from "../src/api/v1/models/bookModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Book Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all books", async () => {
    // Arrange
    const mockSnapshot = {
      docs: [
        { id: "1", data: () => ({ title: "Book 1", author: "A1", copiesAvailable: 2 }) },
        { id: "2", data: () => ({ title: "Book 2", author: "A2", copiesAvailable: 3 }) },
      ],
    };
    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

    // Act
    const result = await bookService.getAllBooks();

    // Assert
    expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("books");
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Book 1");
  });

  it("should get a book by id", async () => {
    // Arrange
    const mockDoc = { id: "1", data: () => ({ title: "Book 1", author: "A1", copiesAvailable: 2 }) };
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

    // Act
    const result = await bookService.getBookById("1");

    // Assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("books", "1");
    expect(result?.id).toBe("1");
    expect(result?.title).toBe("Book 1");
  });

  it("should update a book", async () => {
    // Arrange
    const mockDocId = "test-book-id";
    const mockBook: Book = {
      id: mockDocId,
      title: "Test Book",
      author: "Test Author",
      copiesAvailable: 1,
    };
    const updateData = {
      title: "Updated Book",
      author: "Updated Author",
      copiesAvailable: 5,
    };

    jest.spyOn(bookService, "getBookById").mockResolvedValue(mockBook as any);
    (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

    // Act
    const result = await bookService.updateBook(mockDocId, updateData);

    // Assert
    expect(bookService.getBookById).toHaveBeenCalledWith(mockDocId);
    expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
      "books",
      mockDocId,
      expect.objectContaining(updateData)
    );
    expect(result?.title).toBe("Updated Book");
  });

  it("should create a book successfully", async () => {
    // Arrange
    const mockBookData = { title: "Test Book", author: "Test Author", copiesAvailable: 2 };
    const mockDocumentId = "test-book-id";
    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

    // Act
    const result: Book = await bookService.createBook(mockBookData as any);

    // Assert
    expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
      "books",
      expect.objectContaining({ title: mockBookData.title, author: mockBookData.author })
    );
    expect(result.id).toBe(mockDocumentId);
    expect(result.title).toBe(mockBookData.title);
  });

  it("should delete a book successfully", async () => {
    // Arrange
    const mockDocumentId = "test-book-id";
    const mockBook: Book = { id: mockDocumentId, title: "Test Book", author: "Author", copiesAvailable: 1 };
    jest.spyOn(bookService, "getBookById").mockResolvedValue(mockBook as any);
    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    // Act
    await bookService.deleteBook(mockDocumentId);

    // Assert
    expect(bookService.getBookById).toHaveBeenCalledWith(mockDocumentId);
    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("books", mockDocumentId);
  });
});
