const getUserFromEmail = async (email, Token) => {
    try {
        // Send a POST request to your DRF API endpoint with the user information
        const response = await fetch(`https://p8u4dzxbx2uzapo8hev0ldeut0xcdm.pythonanywhere.com//api/users/search/?search=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`, // Include the user's access token if needed
            },
            body: JSON.stringify({
                user: user.uid,
                profile_picture: user.photoURL,
                // Include other fields as needed
            }),
        });

        if (response.ok) {
            console.log('User profile saved successfully.');
            return response.json();
        } else {
            return { error: 'Failed to save user profile.' };
        }
    } catch (error) {
        return { error: error.message || 'Failed to save user profile.' };
    }
};

export default getUserFromEmail;