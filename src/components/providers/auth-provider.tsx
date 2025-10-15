
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendEmailVerification, sendPasswordResetEmail, updateProfile, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase';
import { createSessionCookie, clearSessionCookie } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, pass: string, name: string) => Promise<any>;
  signIn: (email: string, pass:string) => Promise<any>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserProfilePicture: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      const isJustVerified = currentUser && currentUser.emailVerified && user && !user.emailVerified;
      
      setUser(currentUser);
      
      if(currentUser) {
        if (currentUser.emailVerified) {
            const idToken = await currentUser.getIdToken();
            await createSessionCookie(idToken);
            if (isJustVerified) {
                 toast({
                    title: "Verification Successful!",
                    description: "Your email has been verified. Welcome!",
                });
            }
        }
      } else {
        await clearSessionCookie();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const signUp = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      // The onAuthStateChanged listener will handle setting the user state.
      // We trigger a refresh of the user object to get the latest profile data.
      await userCredential.user.reload();
      setUser(auth.currentUser);
    }
    return userCredential;
  };

  const signIn = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    router.push('/login');
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new Error("No user is currently signed in.");
    }
  };

  const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/login`,
    });
  }

  const updateUserProfilePicture = async (file: File) => {
    if (!auth.currentUser) {
      throw new Error("No user is signed in.");
    }
    
    // In a real app, you would upload the file to a service like Firebase Storage
    // and get a URL back. For this placeholder, we'll generate a new picsum URL
    // to simulate an update. We use the UID and current time to ensure a new image.
    const newPhotoURL = `https://picsum.photos/seed/${auth.currentUser.uid}/${Date.now()}/200/200`;

    await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
    
    // To ensure the UI updates, we create a new user object that React will recognize as a state change.
    // The auth.currentUser object itself might not be a new reference after updateProfile.
    if (auth.currentUser) {
        setUser({ ...auth.currentUser, photoURL: newPhotoURL });
    }
  };

  const value = { user, loading, signUp, signIn, signOut, sendVerificationEmail, sendPasswordReset, updateUserProfilePicture };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
