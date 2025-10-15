import admin from 'firebase-admin';

let auth: admin.auth.Auth | undefined;
let db: admin.firestore.Firestore | undefined;

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://abhay-67783-default-rtdb.firebaseio.com',
      });
      auth = admin.auth();
      db = admin.firestore();
    } catch (e) {
      console.error('Failed to parse Firebase service account key:', e);
    }
  } else {
    console.warn(
      'Firebase Admin SDK service account not found. Skipping initialization.'
    );
  }
} else {
    auth = admin.auth();
    db = admin.firestore();
}


export { auth, db };
