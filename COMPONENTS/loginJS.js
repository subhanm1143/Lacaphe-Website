// document.querySelector("#show-login").addEventListener("click", function(){document.querySelector(".popup").classList.add("active");});
// document.querySelector(".popup .close-btn").addEventListener("click", function(){document.querySelector(".popup").classList.remove("active");});

const emailInput = document.querySelector('#email');

const passwordInput = document.querySelector('#password');

const signInButton = document.querySelector('#signin-btn');
const signOutButton = document.querySelector('#signout-btn');

async function handleSignIn() {
    // Get the values from the email and password fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email, 'Password:', password);
    const userData = {
        email: email,
        password: password
    };

    try {
        // Login and obtain the token
        const response = await axios.post('/login', userData);
        console.log('Login successful:', response);

        // Assuming the token is returned in response.data.accessToken
        const { accessToken } = response.data;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', accessToken);

        // Example of using the token to access a protected route
        const protectedResponse = await axios.get('/protected', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('Protected route response:', protectedResponse.data);
        // Handle access to protected route here, e.g., redirect or display data
    } catch (error) {
        // Handle error (login failed or protected route access failed)
        console.error('Error:', error);
    }
}
async function handleSignOut() {
    try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token'); // Or sessionStorage

        // Send a request to the server to invalidate the token
        await axios.post('/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Remove the token from local storage to complete the logout on the client side
        localStorage.removeItem('token');
    
        // For sessionStorage
        sessionStorage.removeItem('token');

        // Optionally, show a success message to the user
        alert('Logged out successfully');
    } catch (error) {
        console.error('Sign out failed:', error);

        // Optionally, show an error message to the user
        alert('Logout failed. Please try again.');
    }
}


// Add event listener to the Sign in button
signInButton.addEventListener('click', handleSignIn);
signOutButton.addEventListener('click', handleSignOut);