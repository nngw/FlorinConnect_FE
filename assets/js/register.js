const form = document.querySelector("#registerForm");
form.addEventListener("submit", createNewUser);

const userURL = "https://florinconnectapi.onrender.com/users";
const localUserURL = "http://localhost:3000/users";

//fetch then create new user
fetch(localUserURL)
  .then((response) => {
    return response.json();
  })
  .then(createNewUser());

//create new user function
async function createNewUser(e) {
  e.preventDefault();
  //create user data json
  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  console.log(data);
  //create post for adding the data
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const userResponse = await fetch(localUserURL, options);
  alert("new user created");
  if (userResponse.status == 201) {
    e.target.username.value = "";
    e.target.password.value = "";
  }
}
