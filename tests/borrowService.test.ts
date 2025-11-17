import * as borrowService from "../src/api/v1/services/borrowService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { BorrowRecord } from "../src/api/v1/models/borrowModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Borrow Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all borrows", async () => {
    const mockSnapshot = {
      docs: [
        { id: "1", data: () => ({ userId: "u1", bookId: "b1", status: "borrowed" }) },
        { id: "2", data: () => ({ userId: "u2", bookId: "b2", status: "returned" }) },
      ],
    };

    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await borrowService.getAllBorrows();

    expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("borrows");
    expect(result).toHaveLength(2);
    expect(result[0].userId).toBe("u1");
  });

  it("should get a borrow by id", async () => {
    const mockDoc = { id: "1", data: () => ({ userId: "u1", bookId: "b1", status: "borrowed" }) };
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

    const result = await borrowService.getBorrowById("1");

    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("borrows", "1");
    expect(result?.id).toBe("1");
    expect(result?.userId).toBe("u1");
  });

  it("should create a borrow record", async () => {
    const mockRecordData = { userId: "u1", bookId: "b1", borrowedAt: new Date().toISOString(), dueDate: new Date().toISOString(), status: "borrowed" };
    const mockDocumentId = "br_1";
    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

    const result: BorrowRecord = await borrowService.createBorrow(mockRecordData as any);

    expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
      "borrows",
      expect.objectContaining({ userId: "u1", bookId: "b1" })
    );
    expect(result.id).toBe(mockDocumentId);
    expect(result.userId).toBe("u1");
  });

  it("should update a borrow record", async () => {
    const id = "br_1";
    const existing: BorrowRecord = {
      id,
      userId: "u1",
      bookId: "b1",
      borrowedAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      returnedAt: null,
      status: "borrowed",
    };

    jest.spyOn(borrowService, "getBorrowById").mockResolvedValue(existing as any);
    (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

    const updateData = { status: "returned", returnedAt: new Date().toISOString() };
    const result = await borrowService.updateBorrow(id, updateData as any);

    expect(borrowService.getBorrowById).toHaveBeenCalledWith(id);
    expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
      "borrows",
      id,
      expect.objectContaining({ status: "returned" })
    );
    expect(result?.status).toBe("returned");
  });

  it("should delete a borrow record", async () => {
    const id = "br_1";
    const existing: BorrowRecord = {
      id,
      userId: "u1",
      bookId: "b1",
      borrowedAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      returnedAt: null,
      status: "borrowed",
    };

    jest.spyOn(borrowService, "getBorrowById").mockResolvedValue(existing as any);
    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    await borrowService.deleteBorrow(id);

    expect(borrowService.getBorrowById).toHaveBeenCalledWith(id);
    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("borrows", id);
  });
});
