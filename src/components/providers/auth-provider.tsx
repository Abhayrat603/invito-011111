
"use client";

import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendEmailVerification, sendPasswordResetEmail, updateProfile, type User, updateEmail, updatePassword, reload } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app, storage } from '@/lib/firebase';
import { createSessionCookie, clearSessionCookie } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, pass: string, name: string) => Promise<any>;
  signIn: (email: string, pass:string) => Promise<any>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserProfile: (profileData: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserProfilePicture: (photoDataUrl: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  updateUserPhoneNumber: (phoneNumber: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
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
  }, []);

  const signUp = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateUserProfile({ displayName: name });
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

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is signed in.");
    }
    await updateProfile(currentUser, profileData);
    // After updating, we need a fresh user object with the updated info.
    // We reload the user to get the latest profile data from Firebase Auth.
    if (auth.currentUser) {
      await reload(auth.currentUser);
      setUser(auth.currentUser ? { ...auth.currentUser } : null);
    }
  };
  
  const updateUserEmail = async (email: string) => {
    if (!auth.currentUser) throw new Error("No user is signed in.");
    await updateEmail(auth.currentUser, email);
    await sendVerificationEmail(); 
    await updateUserProfile({}); 
  };

  const updateUserPassword = async (password: string) => {
    if (!auth.currentUser) throw new Error("No user is signed in.");
    await updatePassword(auth.currentUser, password);
    await updateUserProfile({}); 
  };
  
  const updateUserPhoneNumber = async (phoneNumber: string) => {
    // This is a placeholder. In a real app, this would involve phone number verification.
    // For now, we'll just show a success toast.
    console.log("Updating phone number to:", phoneNumber);
    if (!auth.currentUser) throw new Error("No user is signed in.");

    // In a real Firebase app, you would use RecaptchaVerifier and link/update phone number.
    // This is a simplified version for demonstration.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
  };


  const updateUserProfilePicture = async (photoDataUrl: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not signed in");
    }

    const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
    
    // 'data_url' comes from the File API. It's the base64-encoded string.
    const uploadTask = await uploadString(storageRef, photoDataUrl, 'data_url');
    const downloadURL = await getDownloadURL(uploadTask.ref);

    // Call the corrected updateUserProfile function
    await updateUserProfile({ photoURL: downloadURL });
  };

  const value = { user, loading, signUp, signIn, signOut, sendVerificationEmail, sendPasswordReset, updateUserProfile, updateUserProfilePicture, updateUserEmail, updateUserPassword, updateUserPhoneNumber };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
