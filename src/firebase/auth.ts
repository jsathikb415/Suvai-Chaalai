import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, useMockFirebase } from './config';
import { User } from '../types';

// Mock data for development without Firebase
const MOCK_ADMIN_EMAIL = 'admin@suvaichaalai.com';
const MOCK_USERS = [
  {
    uid: 'admin-uid',
    email: MOCK_ADMIN_EMAIL,
    displayName: 'Admin User',
    photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    isAdmin: true
  },
  {
    uid: 'user-uid-1',
    email: 'user1@example.com',
    displayName: 'Demo User',
    photoURL: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    isAdmin: false
  }
];

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  if (useMockFirebase) {
    // Return mock user
    return MOCK_USERS[1];
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create new user document
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false,
        createdAt: new Date()
      });
    }
    
    // Get user data including admin status
    const userData = userSnap.exists() 
      ? userSnap.data() as User 
      : { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          isAdmin: false
        };
    
    return userData;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<User | null> => {
  if (useMockFirebase) {
    // Return mock user
    return {
      uid: `user-${Date.now()}`,
      email,
      displayName,
      photoURL: null,
      isAdmin: false
    };
  }
  
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update profile with display name
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: null,
      isAdmin: false,
      createdAt: new Date()
    });
    
    return {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: null,
      isAdmin: false
    };
  } catch (error) {
    console.error('Error signing up with email:', error);
    return null;
  }
};

// Sign in with email and password
export const signInWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<User | null> => {
  if (useMockFirebase) {
    // Check if admin
    if (email === MOCK_ADMIN_EMAIL && password === 'admin123') {
      return MOCK_USERS[0];
    }
    
    // Mock regular user
    return MOCK_USERS[1];
  }
  
  try {
    const result = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Get user data including admin status from Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    return userSnap.data() as User;
  } catch (error) {
    console.error('Error signing in with email:', error);
    return null;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  if (!useMockFirebase) {
    await firebaseSignOut(auth);
  }
};

// Get current user from Firestore
export const getCurrentUser = async (user: FirebaseUser | null): Promise<User | null> => {
  if (useMockFirebase) {
    // Return mock user or null
    return MOCK_USERS[1];
  }
  
  if (!user) return null;
  
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    return userSnap.data() as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Check if user is admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  if (useMockFirebase) {
    return userId === MOCK_USERS[0].uid;
  }
  
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return false;
    }
    
    return userSnap.data().isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};