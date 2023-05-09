// const loginButton = document.querySelector("#submitButton");
// let formID = document.getElementById("registerForm");

// loginButton.addEventListener("click", function () {
//   let alertDiv = document.createElement("div");
//   alertDiv.setAttribute("class", "position relative");
//   let innerDiv = document.createElement("div");
//   innerDiv.setAttribute(
//     "class",
//     "alert alert-success alert-dismissible fade show correct w-100 position-absolute top-100 start-50 translate-middle"
//   );
//   innerDiv.setAttribute("role", "alert");
//   innerDiv.innerText =
//     "You have successfully registered. Please proceed to the Login Page.";

//   let closeButton = document.createElement("button");
//   closeButton.setAttribute("class", "btn-close");
//   closeButton.setAttribute("data-bs-dismiss", "alert");
//   closeButton.setAttribute("aria-label", "Close");
//   innerDiv.appendChild(closeButton);
//   alertDiv.appendChild(innerDiv);
//   formID.appendChild(alertDiv);

//   console.log(document.body);
// });

const userURL = "https://florinconnectapi.onrender.com/users";
const localUserURL = "http://localhost:3000/users";
const tokensURL = "https://florinconnectapi.onrender.com/tokens";
const localTokensURL = "http://localhost:3000/tokens";
//fetch then create new user
fetch(localUserURL)
  .then((response) => {
    return response.json();
  })
  .then(createNewUser());

const form = document.querySelector("#registerForm");
form.addEventListener("submit", createNewUser);

//create new user function
async function createNewUser(e) {
  e.preventDefault();

  //create user data json
  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  //create post for adding the data
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  //fetch and create new user response
  const userResponse = await fetch(localUserURL, options);
  const tokenResponse = await fetch(localTokensURL, options);
  alert("new user created");
  if (userResponse.status == 201 && tokenResponse.status == 201) {
    e.target.username.value = "";
    e.target.password.value = "";
  }
}
