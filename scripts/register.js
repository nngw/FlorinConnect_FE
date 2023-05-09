const loginButton = document.querySelector("#submitButton");
let formID = document.getElementById("registerForm");

loginButton.addEventListener("click", function () {
  let alertDiv = document.createElement("div");
  alertDiv.setAttribute("class", "position relative");
  let innerDiv = document.createElement("div");
  innerDiv.setAttribute(
    "class",
    "alert alert-success alert-dismissible fade show correct w-100 position-absolute top-100 start-50 translate-middle"
  );
  innerDiv.setAttribute("role", "alert");
  innerDiv.innerText =
    "You have successfully registered. Please proceed to the Login Page.";

  let closeButton = document.createElement("button");
  closeButton.setAttribute("class", "btn-close");
  closeButton.setAttribute("data-bs-dismiss", "alert");
  closeButton.setAttribute("aria-label", "Close");
  innerDiv.appendChild(closeButton);
  alertDiv.appendChild(innerDiv);
  formID.appendChild(alertDiv);
  // document.body.appendChild(alertDiv);
  console.log(document.body);
});
