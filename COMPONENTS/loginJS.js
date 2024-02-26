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
document.querySelector("#post-createAcc").addEventListener("click", function(){document.querySelector(".create-popup").classList.remove("active");});

/*const emailInput = document.querySelector('#email');

const passwordInput = document.querySelector('#password');

const signInButton = document.querySelector('#signin-btn');


function handleSignIn() {
    // Get the values from the email and password fields
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log('Email:', email, 'Password:', password);
    const userData = {
        email: email,
        password: password
    };
    axios.post('/login', userData)
    .then(response => {
        // Handle success
        console.log('Login successful:', response);
        // You can redirect or perform other actions based on the response
    })
    .catch(error => {
        // Handle error
        console.error('Login error:', error);
    });

}

// Add event listener to the Sign in button
signInButton.addEventListener('click', handleSignIn);*/