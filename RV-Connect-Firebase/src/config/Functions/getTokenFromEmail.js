const getTokenFromEmail = async (email, password) => {
    try {
        // Send a POST request to your DRF API endpoint with the user information
        const response = await fetch(`https://p8u4dzxbx2uzapo8hev0ldeut0xcdm.pythonanywhere.com/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });

        if (response.ok) {
            console.log('User profile saved successfully.');
            const data = await response.json();
            return data.access;
        } else {
            console.log('Failed to save user profile.');
            return null;
        }
    } catch (error) {
        console.error('Error saving user profile:', error);
        return null;
    }
};

export default getTokenFromEmail;