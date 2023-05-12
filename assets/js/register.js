const form = document.querySelector('#registerForm');
form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const form = new FormData(e.target);
	//create user data json
	// const data = {
	// 	username: e.target.username.value,
	// 	password: e.target.password.value,
	// };
	// console.log(data);
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

	const response = await fetch('https://florinconnectapi.onrender.com/users', options);
	const responseBody = await response.json();

	// const userResponse = await fetch(localUserURL, options);
	// alert('new user created');

	if (response.status === 201) {
		// const token = responseBody.token;
		// localStorage.setItem('token', token);
		alert('new user created');

		window.location.href = '/login.html';
		e.target.username.value = '';
		e.target.password.value = '';
	}
});

// const userURL = 'https://florinconnectapi.onrender.com/users';
// const localUserURL = 'http://localhost:3000/users';

//fetch then create new user
// fetch(localUserURL)
//   .then((response) => {
//     return response.json();
//   })
//   .then(createNewUser());

// fetch(localUserURL)
// 	.then((response) => {
// 		return console.log(response.json());
// 	})
// 	.then(createNewUser);
//create new user function
// async function createNewUser
