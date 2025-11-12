import * as userService from "../src/api/v1/services/userService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { User } from "../src/api/v1/models/userModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all users", async () => {
    // Arrange
    const mockSnapshot = {
      docs: [
        { id: "1", data: () => ({ name: "User 1", email: "u1@example.com" }) },
        { id: "2", data: () => ({ name: "User 2", email: "u2@example.com" }) },
      ],
    };
    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

    // Act
    const result = await userService.getAllUsers();

    // Assert
    expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("users");
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("User 1");
  });

  it("should get a user by id", async () => {
    // Arrange
    const mockDoc = { id: "1", data: () => ({ name: "User 1", email: "u1@example.com" }) };
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

    // Act
    const result = await userService.getUserById("1");

    // Assert
    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("users", "1");
    expect(result?.id).toBe("1");
    expect(result?.name).toBe("User 1");
  });

  it("should update a user", async () => {
    // Arrange
    const mockDocId = "test-user-id";
    const mockUser: User = {
      id: mockDocId,
      name: "Test User",
      email: "test@example.com",
    };
    const updateData = {
      name: "Updated User",
      email: "updated@example.com",
    };

    jest.spyOn(userService, "getUserById").mockResolvedValue(mockUser as any);
    (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

    // Act
    const result = await userService.updateUser(mockDocId, updateData);

    // Assert
    expect(userService.getUserById).toHaveBeenCalledWith(mockDocId);
    expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
      "users",
      mockDocId,
      expect.objectContaining(updateData)
    );
    expect(result?.name).toBe("Updated User");
  });

  it("should create a user successfully", async () => {
    // Arrange
    const mockUserData = { name: "Test User", email: "test@example.com" };
    const mockDocumentId = "test-user-id";
    (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

    // Act
    const result: User = await userService.createUser(mockUserData as any);

    // Assert
    expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
      "users",
      expect.objectContaining({ name: mockUserData.name, email: mockUserData.email })
    );
    expect(result.id).toBe(mockDocumentId);
    expect(result.name).toBe(mockUserData.name);
  });

  it("should delete a user successfully", async () => {
    // Arrange
    const mockDocumentId = "test-user-id";
    const mockUser: User = { id: mockDocumentId, name: "Test User", email: "test@example.com" };
    jest.spyOn(userService, "getUserById").mockResolvedValue(mockUser as any);
    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    // Act
    await userService.deleteUser(mockDocumentId);

    // Assert
    expect(userService.getUserById).toHaveBeenCalledWith(mockDocumentId);
    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("users", mockDocumentId);
  });
});
