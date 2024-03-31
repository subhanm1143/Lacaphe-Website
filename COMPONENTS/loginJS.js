//brings up login screen
//document.querySelector("#show-login").addEventListener("click", function(){document.querySelector(".popup").classList.add("active");});

document.querySelector("a.nav-bar-link[href='/login']").addEventListener("click", function(event){
    event.preventDefault(); // Prevent the default action of following the link
    document.querySelector(".popup").classList.add("active");
});


//closes pop ups
document.querySelector(".popup .close-btn").addEventListener("click", function(){document.querySelector(".popup").classList.remove("active");});
document.querySelector(".create-popup .close-btn").addEventListener("click", function(){document.querySelector(".create-popup").classList.remove("active");});
document.querySelector("#sign").addEventListener("click", function() {
    document.querySelector(".popup").classList.remove("active");
    
    // Retrieve the values of email and password input fields
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    // Log the email and password to the console
    console.log("Email:", email);
    console.log("Password:", password);
});

//Brings up create screen
document.querySelector("#createAcc").addEventListener("click", function(){document.querySelector(".create-popup").classList.add("active");});
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

        const response = await axios.post('/login', userData);
        console.log('Login successful:', response);
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        const protectedResponse = await axios.get('/protected', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('Protected route response:', protectedResponse.data);

    } catch (error) {
      
        console.error('Error:', error);
    }
    
}
async function handleSignOut() {
    try {
   
        const token = localStorage.getItem('token'); 
        await axios.post('/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        alert('Logged out successfully');
    } catch (error) {
        console.error('Sign out failed:', error);

        alert('Logout failed. Please try again.');
    }
}


document.querySelector("#post-createAcc").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Validate email and password
    const email = document.getElementById('email-create').value;
    const password = document.getElementById('create-password').value;
    const password2 = document.getElementById('confirm-password').value;

    console.log("The email is " + email);
    console.log("The password is " + password);
    console.log("The password2 is " + password2);
    
    if (!email.includes('@') || !email.endsWith('.com')) {
        // Show the invalid create account popup message
        document.getElementById('create-invalid-popup').style.display = 'block';
        return; // Exit function to prevent account creation
    }
    if(password != password2 || password.length < 8){
        document.getElementById('create-invalid-popup-password').style.display = 'block';
        return; // Exit function to prevent account creation
    }
    
    //Continue Acccount CREATION HERE
    
});

document.getElementById('invalid-popup-login').addEventListener('click', function() {
    this.style.display = 'none';
});
document.getElementById('create-invalid-popup').addEventListener('click', function() {
    this.style.display = 'none';
});
document.getElementById('create-invalid-popup-password').addEventListener('click', function() {
    this.style.display = 'none';
});
// Add event listener to the Sign in button
signInButton.addEventListener('click', handleSignIn);
signOutButton.addEventListener('click', handleSignOut);