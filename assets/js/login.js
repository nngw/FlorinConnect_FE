const form = document.querySelector("#loginForm");
form.addEventListener("submitButton", loginUser);

const url = "https://florinconnectapi.onrender.com/users";
const localURL = "http://localhost:3000/users";
//fetch then create new user
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(loginUser());

//create new user function
async function loginUser(e) {
  e.preventDefault();

  //create user data json
  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  //create post for adding the data
  //TODO: change accodring to backend
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  //fetch and create new user response
  const response = await fetch(
    "https://florinconnectapi.onrender.com/users", // TODO: chaange accorgind to backend
    options
  );
  alert("new user created");
  if (response.status == 201) {
    e.target.username.value = "";
    e.target.password.value = "";
  }
}
