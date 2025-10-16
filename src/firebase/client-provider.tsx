
'use client';

import { app, auth, db } from '@/lib/firebase';
import React, { ReactNode } from 'react';

// This provider is a simple wrapper to ensure Firebase is initialized on the client.
// In a more complex app, this could hold client-side Firebase context.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  // The firebase instances are initialized in @/lib/firebase.ts
  // This component just ensures that the initialization logic runs on the client.
  return <>{children}</>;
}
