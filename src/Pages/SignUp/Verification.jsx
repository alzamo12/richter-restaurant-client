import { getAuth, signInWithEmailLink } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const Verification = () => {

    const auth = getAuth();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const url = window.localStorage.href;
        const email = window.localStorage.getItem("emailForSignIn");
        
        if(email && signInWithEmailLink(auth, email, url)){
            signInWithEmailLink(auth, email, url)
            .then(result => {
                {
                    console.log(result)
                    setMessage("sign-in successfully")
                    window.localStorage.removeItem("emailForSignIn")
                }
            })
            .catch(error => {
                setMessage("Error completing signin")
                console.log(error)
            })
            
        }
    })

    return (
        <div>
            {message}
        </div>
    );
};

export default Verification;