import {
    initializeApp,
    cert,
    getApps,
    ServiceAccount,
    AppOptions,
    App,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

/**
 * Retrieves Firebase configuration from environment variables
 *
 * @returns {AppOptions} Firebase application configuration object
 * @throws {Error} If any required environment variables are missing
 */
const getFirebaseConfig = (): AppOptions => {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
        process.env;

    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
    ) {
        throw new Error(
            "Missing Firebase configuration. Please check your environment variables"
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines in the private key string with actual newlines
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credential: cert(serviceAccount),
    };
};

/**
 * Iniutializes Firebase Admin SDK if not already initialized
 *
 * This fuynction implements the singleton pattern to ensure only
 * onbe Firebase app instance is created
 *
 * @returns {App} Firebase Admin app instance
 */
const initializeFirebaseAdmin = (): App => {
    // Check if an app is already initialized
    const existingApp: App = getApps()[0];
    if (existingApp) {
        // Return the existing app
        return existingApp;
    }

    return initializeApp(getFirebaseConfig());
};

const firebaseApp: App = initializeFirebaseAdmin();

// get a reference to firebase authentication
const auth: Auth = getAuth(firebaseApp);

// get a reference to the firestore database
const db: Firestore = getFirestore(firebaseApp);

export { auth, db };