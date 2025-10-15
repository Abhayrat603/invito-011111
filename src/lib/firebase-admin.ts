import admin from 'firebase-admin';

let auth: admin.auth.Auth;
let db: admin.firestore.Firestore;

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://abhay-67783-default-rtdb.firebaseio.com',
      });
    } catch (e) {
      console.error('Failed to parse Firebase service account key:', e);
    }
  } else {
    console.warn(
      'Firebase Admin SDK service account not found. Skipping initialization.'
    );
  }
}

// Only assign auth and db if the app was initialized
if (admin.apps.length > 0) {
  auth = admin.auth();
  db = admin.firestore();
} else {
  // Provide mock instances if not initialized to prevent app from crashing on import
  // @ts-ignore
  auth = {};
  // @ts-ignore
  db = {};
}

export { auth, db };
