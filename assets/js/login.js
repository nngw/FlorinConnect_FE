const form = document.querySelector("#loginForm");
form.addEventListener("submitButton", loginUser);

const url = "https://florinconnectapi.onrender.com/auth";
const localURL = "http://localhost:3000/users";
//fetch then create new user

// async function getURL() {
//   let response = await fetch(localURL);
//   data = response.json();
//   console.log(data);
// }

fetch(localURL)
  .then((response) => {
    return response.json();
  })
  .then(loginUser);

//create new user function
async function loginUser(e) {
  e.preventDefault();
  console.log("entered login user");
  //create user data json
  console.log(e);
  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  console.log(data);
  //create post for adding the data
  //TODO: change accodring to backend
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credential: "include",
    body: JSON.stringify(data),
  };

  //fetch and create new user response
  const response = await fetch(`${localURL}/login`, options);
  alert("user found");
  if (response.status == 204) {
    window.location.href = "board.html";
    alert("successfully logged in");
  }
}
