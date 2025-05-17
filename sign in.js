// const loginEmail = document.getElementById("email").value
// const loginPassword = document.getElementById("password").value

// // GETITEM THAT WAS SET TO LOCAL STORAGE
// const userData = localStorage.getItem(`user_${loginEmail}`)
// console.log(userData);
// if(!userData){
//     console.log("user not found");
// }

// const user = JSON.parse(userData);
// const email = user.email;
// const password = user.password;

// if (loginPassword === password) {
//     console.log("login successful");
// }else{
//     console.log("wrong thing");
    
// }



    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get trimmed input values
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Validate inputs
      if (!email || !password) {
        alert("Please fill in both email and password fields");
        return;
      }
      
      // getting the email
    // Helper function to find user key by email
    function findUserKeyByEmail(email) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("user_")) {
          const user = JSON.parse(localStorage.getItem(key));
          if (user.email === email) {
            return key;
          }
        }

      }
      return null;
  
    }
  
      // Check localStorage for matching user
      const userKey = findUserKeyByEmail(email);
  
      if (!userKey) {
        alert("No user found with that email address");
        return;
      }
  //getting the password
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem(userKey));
  
      // Verify password
      if (userData.password === password) {
        // Successful login
        localStorage.setItem("currentUser", JSON.stringify(userData));
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      } else {
        alert("Incorrect password");
      }
    });
  
  