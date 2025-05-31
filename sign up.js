const username = document.getElementById("name");
const email = document.getElementById("signupEmail");
const password = document.getElementById("signupPassword");
const form = document.getElementById("form");
const usersName = document.getElementById("users-name")


// console.log(form);

// EVENT LISTENER FOR FORM
form.addEventListener("submit", user);

function user(e) {
  e.preventDefault(); // Uncomment this to prevent form submission
  
  // Get current values when form is submitted
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
               
  // paragraph.setAttribute("value", `${country.name.common}`);


  // const wholeName = `${usernameValue}`
  // usersName.innerHTML = wholeName
  // console.log(usersName);


  if (!usernameValue || !emailValue || !passwordValue) {
    alert("All fields are required");
    return;
  }else{
    window.location.href = "login.html"
  }

  // console.log("User inputs:", {
  //   username: usernameValue,
  //   email: emailValue,
  //   password: passwordValue,
  // });

  // Save to localStorage when form is submitted
  localStorage.setItem(
    `user_${emailValue}`,
    JSON.stringify({
      username: usernameValue,
      password: passwordValue,
      email: emailValue,
    })
  );

  // You can also submit to your server here
  /*
  const response = fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
    }),
  });
  */
}

// Remove this line - it's causing the error
// user(e);
