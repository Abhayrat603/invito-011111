
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
  signIn: (email: string, pass: string) => Promise<any>;
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      const isJustVerified = user && user.emailVerified && !auth.currentUser?.emailVerified;
      
      setUser(user);
      setLoading(false);
      
      if(user) {
        if (user.emailVerified) {
            const idToken = await user.getIdToken(true); // Force refresh
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
    });

    return () => unsubscribe();
  }, [auth, toast]);

  const signUp = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    // Manually update the user state to reflect the new display name
    setUser({ ...userCredential.user, displayName: name });
    return userCredential;
  };

  const signIn = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
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
    return sendPasswordResetEmail(auth, email);
  }

  const updateUserProfilePicture = async (file: File) => {
    if (!auth.currentUser) {
      throw new Error("No user is signed in.");
    }
    
    // In a real app, you would upload the file to a service like Firebase Storage
    // and get a URL. For this example, we'll use a placeholder.
    const newPhotoURL = `https://picsum.photos/seed/${auth.currentUser.uid}/${Date.now()}/200/200`;

    await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
    
    // Manually update the user state to reflect the new photoURL immediately
    setUser(auth.currentUser);
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
