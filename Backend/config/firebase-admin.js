const admin = require('firebase-admin');

/**
 * Initializes Firebase Admin SDK using environment variables.
 * Skips initialization if credentials are not configured.
 */
if (!admin.apps.length) {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
            console.log("✅ Firebase Admin Initialized");
        } catch (error) {
            console.error("❌ Firebase Admin Initialization Error:", error.message);
        }
    } else {
        console.log("⚠️ Firebase Admin skipped — credentials not configured in .env");
    }
}

module.exports = admin;
