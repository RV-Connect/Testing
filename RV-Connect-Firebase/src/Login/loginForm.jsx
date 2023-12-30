import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './static/styles.css';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import getTokenFromEmail from '../config/Functions/getTokenFromEmail';
import getUserFromEmail from '../config/Functions/getUserFromEmail';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await saveUserProfileToAPI(user);
        } catch (error) {
            console.log(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/logOutPage');
        } catch (error) {
            console.log(error);
        }
    };

    const saveUserProfileToAPI = async (user) => {
        try {
            const token = getTokenFromEmail(user.email, user.password);
            const user = getUserFromEmail(user.email);
            const userName = user.username;
            // Send a POST request to your DRF API endpoint with the user information
            const response = await fetch(`https://p8u4dzxbx2uzapo8hev0ldeut0xcdm.pythonanywhere.com/profile-pics/by-username/${username}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`, // Include the user's access token if needed
                },
                body: JSON.stringify({
                    user: user.uid,
                    profile_picture: user.photoURL,
                    // Include other fields as needed
                }),
            });
    
            if (response.ok) {
                console.log('User profile saved successfully.');
            } else {
                console.log('Failed to save user profile.');
            }
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };

    return (
        <div className="login-container">
            {user ? (
                // User is logged in, display user details and log out button
                <>
                    <div>
                        <img src={user.photoURL} alt="User Profile" />
                        <p>{user.displayName}</p>
                    </div>
                    <button onClick={logOut}>Log Out</button>
                </>
            ) : (
                // User is not logged in, display sign in with Google button
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            )}
        </div>
    );
};

export default LoginForm;
