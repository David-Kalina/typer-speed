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
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase'

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
  signUp: (data: SignUpData) => Promise<UserCredential>
  signIn: (data: SignInData) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  signOutUser: () => Promise<void>
}>(null as any)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  const [user, setUser] = useState<User | null>(null)

  const signUp = ({
    email,
    password,
    verifyEmail,
    verifyPassword,
  }: SignUpData) => {
    if (password !== verifyPassword) {
      throw new Error('Passwords do not match')
    }

    if (email !== verifyEmail) {
      throw new Error('Emails do not match')
    }

    const statsRef = doc(db, 'stats', email)

    setDoc(statsRef, {
      testsTaken: 0,
      testsCompleted: 0,
      timeTyping: 0,
    })

    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = ({ email, password }: SignInData) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, provider)
    const statsRef = doc(db, 'stats', credential.user.email as string)

    return getDoc(statsRef).then(doc => {
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
  }

  const signOutUser = async () => {
    try {
      return signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
    })

    return unsubscribe
  }, [])

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
