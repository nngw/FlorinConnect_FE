const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	//create user data json
	const form = new FormData(e.target);

	//create post for adding the data
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: form.get('username'),
			password: form.get('password'),
		}),
	};

	//fetch and create new user response
	const response = await fetch('https://florinconnectapi.onrender.com/users/login', options);
	console.log(response);
	const responseBody = await response.json();
	if (response.status === 200) {
		const token = responseBody.token;

		localStorage.setItem('token', token);
		alert('successfully logged in');

		window.location.href = 'board.html';
	} else {
		console.log(responseBody.error);
		alert('invalid username or password');
	}

	// if (response.status == 204) {
	// 	window.location.href = 'board.html';
	// 	alert('successfully logged in');
	// }
});

//fetch then create new user

// async function getURL() {
//   let response = await fetch(localURL);
//   data = response.json();
//   console.log(data);
// }

// fetch(localURL)
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then(loginUser);

//create new user function
// async function loginUser
