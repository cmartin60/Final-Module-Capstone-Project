import { QuerySnapshot, DocumentData, DocumentSnapshot } from "firebase-admin/firestore";
import { User } from "../models/userModel";
import {
	createDocument,
	getDocuments,
	getDocumentById,
	updateDocument,
	deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "users";

/**
 * Retrieves all users from Firestore
 */
export const getAllUsers = async (): Promise<User[]> => {
	const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
	const users: User[] = snapshot.docs.map((doc) => {
		const data: DocumentData = doc.data();
		return {
			id: doc.id,
			...data,
		} as User;
	});
	return users;
};

/**
 * Creates a new user
 */
export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
	const newUser: Partial<User> = { ...userData };
	const userId: string = await createDocument<User>(COLLECTION, newUser);
	return structuredClone({ id: userId, ...newUser } as User);
};

/**
 * Retrieves a single user by ID from Firestore
 */
export const getUserById = async (id: string): Promise<User | null> => {
	const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

	if (!doc) {
		return null;
	}

	const data: DocumentData | undefined = doc.data();
	const user: User = {
		id: doc.id,
		...data,
	} as User;

	return structuredClone(user);
};

/**
 * Updates an existing user
 */
export const updateUser = async (
	id: string,
	userData: Partial<Omit<User, "id">>
): Promise<User | null> => {
	const user: User | null = await getUserById(id);
	if (!user) {
		return null;
	}

	const updatedUser: User = { ...user };
	if (userData.name !== undefined) updatedUser.name = userData.name;
	if (userData.email !== undefined) updatedUser.email = userData.email;

	await updateDocument<User>(COLLECTION, id, updatedUser);
	return structuredClone(updatedUser);
};

/**
 * Deletes a user from Firestore
 */
export const deleteUser = async (id: string): Promise<void> => {
	const user = await getUserById(id);
	if (!user) {
		throw new Error(`User with ID ${id} not found`);
	}

	await deleteDocument(COLLECTION, id);
};

export default {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
};

