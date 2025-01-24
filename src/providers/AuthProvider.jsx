import React, { Children, createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    };

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };

    const googleSignIn = () => {
        setLoading(true)
        console.log('google', loading)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                console.log(loading)
                const userInfo = { email: currentUser?.email };
                console.log('current user', currentUser.email)
                axiosPublic.post('/jwt', userInfo)
                    .then((res) => {
                        if (res.data.token) {
                            console.log(res.data.token)
                            localStorage.setItem('access-token', res.data.token);
                            // setLoading(false);
                            if(localStorage.getItem('access-token')){
                                setLoading(false)
                            }
                        }
                    })
                // setLoading(false)
            }
            else {
                localStorage.removeItem('access-token')
                // setLoading(false)
            }
            // setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic, auth])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;