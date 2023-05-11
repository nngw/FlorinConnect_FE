const form = document.querySelector("#loginForm");
form.addEventListener("submitButton", getURL);

const url = "https://florinconnectapi.onrender.com/auth";
const localURL = "http://localhost:3000/auth";
//fetch then create new user

async function getURL() {
  fetch(localURL)
    .then((response) => {
      return response.json();
    })
    .then(loginUser());
}

// fetch(localURL)
//   .then((response) => {
//     return response.json();
//   })
//   .then(loginUser());

//create new user function
async function loginUser(e) {
  e.preventDefault();

  //create user data json
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
    credential: "include",
    body: JSON.stringify(data),
  };

  //fetch and create new user response
  const response = await fetch(localURL, options);
  alert("new user created");
  if (response.status == 204) {
    window.location.href = "post.html";
    alert("successfully logged in");
  }
}
