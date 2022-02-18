import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAtom } from 'jotai'
import React, { createContext, useContext, useEffect } from 'react'
import { auth, db, provider } from '../firebase'
import { userAtom } from '../store/firebaseAtoms'

export interface SignUpData {
  email: string
  password: string
  verifyPassword: string
  verifyEmail: string
}

export interface SignInData {
  email: string
  password: string
}

const AuthContext = createContext<{
  user: User | null
  signUp: (data: SignUpData) => Promise<UserCredential> | Promise<unknown>
  signIn: (data: SignInData) => Promise<UserCredential> | Promise<unknown>
  signInWithGoogle: () => Promise<UserCredential> | Promise<unknown>
  signOutUser: () => Promise<void>
}>(null as any)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [user, setUser] = useAtom(userAtom)

  const signUp = async ({ email, password, verifyEmail, verifyPassword }: SignUpData) => {
    if (password !== verifyPassword) {
      throw "Passwords don't match"
    }

    if (email !== verifyEmail) {
      throw "Emails don't match"
    }

    const statsRef = doc(db, 'stats', email)

    setDoc(statsRef, {
      testsTaken: 0,
      testsCompleted: 0,
      timeTyping: 0,
    })

    return await createUserWithEmailAndPassword(auth, email, password)
      .then(credential => credential)
      .catch(() => {
        throw 'User already exists'
      })
  }

  const signIn = async ({ email, password }: SignInData) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(credential => credential)
      .catch(() => {
        throw 'Invalid email or password'
      })
  }

  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, provider)
    const statsRef = doc(db, 'stats', credential.user.email as string)
    return getDoc(statsRef)
      .then(doc => {
        if (doc.exists()) {
          return credential
        } else {
          setDoc(statsRef, {
            testsTaken: 0,
            testsCompleted: 0,
            timeTyping: 0,
          })
          return credential
        }
      })
      .catch(() => {
        throw "Couldn't sign in with Google"
      })
  }

  const signOutUser = async () => {
    return signOut(auth)
      .then(() => setUser(null))
      .catch(error => error)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
    })

    return unsubscribe
  }, [setUser])

  const value = {
    user,
    signUp,
    signIn,
    signOutUser,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
