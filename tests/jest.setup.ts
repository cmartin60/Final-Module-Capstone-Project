import dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_PROJECT_ID) {
    process.env.FIREBASE_PROJECT_ID = "test-project";
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
    process.env.FIREBASE_CLIENT_EMAIL = "test@local.test";
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
    process.env.FIREBASE_PRIVATE_KEY =
        "-----BEGIN PRIVATE KEY-----\nTEST_PRIVATE_KEY_FOR_UNIT_TESTS\n-----END PRIVATE KEY-----\n";
}


export {};

// Provide safe runtime mocks for firebase-admin so imports that initialize
// Firebase at module-load time won't attempt to parse real PEMs or contact
// external services during unit tests.
// These mocks run early because this file is configured in `jest.config.js`
// under `setupFiles`.
try {
    // jest may not be available in some tooling contexts; guard against that.
    if (typeof jest !== "undefined") {
        jest.mock("firebase-admin/app", () => ({
            initializeApp: jest.fn(() => ({})),
            cert: jest.fn(() => ({})),
            getApps: jest.fn(() => []),
        }));

        jest.mock("firebase-admin/firestore", () => ({
            getFirestore: jest.fn(() => ({})),
        }));

        jest.mock("firebase-admin/auth", () => ({
            getAuth: jest.fn(() => ({})),
        }));
    }
} catch (err) {
    // swallow - if mocking isn't possible, tests will run as before and may
    // rely on the environment variables set above.
}