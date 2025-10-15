
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendEmailVerification, sendPasswordResetEmail, updateProfile, type User, updateEmail, updatePassword } from 'firebase/auth';
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
  updateUserProfile: (profileData: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserProfilePicture: (file: File) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
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
      setUser({ ...userCredential.user, displayName: name });
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

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is signed in.");
    }
    await updateProfile(currentUser, profileData);
    // Create a new user object to trigger re-render
    setUser(Object.assign(Object.create(currentUser), currentUser));
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

  const updateUserProfilePicture = async (file: File) => {
    // In a real app, you would upload the file to a service like Firebase Storage
    // and get a URL back. For this placeholder, we'll generate a new picsum URL
    // to simulate an update. We use the UID and current time to ensure a new image.
    const newPhotoURL = `https://picsum.photos/seed/${auth.currentUser?.uid}/${Date.now()}/200/200`;
    await updateUserProfile({ photoURL: newPhotoURL });
  };

  const value = { user, loading, signUp, signIn, signOut, sendVerificationEmail, sendPasswordReset, updateUserProfile, updateUserProfilePicture, updateUserEmail, updateUserPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
