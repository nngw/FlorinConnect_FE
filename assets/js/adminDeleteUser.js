const showAllUsersBtn = document.getElementById('showAllUsersBtn');
const FormDeleteUserModal = document.getElementById('FormDeleteUserModal');
const username = document.getElementById('usernameDeleteUser');
const displayResults = document.getElementById('showAllUsers');
const { createUser } = require('./adminAddAdmin');

const showUserById = showAllUsersBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const userName = username.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/users/name/${userName}`);
		const user = await res.json();
		createUser(user, displayResults);
	} catch (error) {
		alert(error);
	}
});

const removeUserModal = FormDeleteUserModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	try {
		const userName = username.value;

		const res = await fetch(`https://florinconnectapi.onrender.com/users/name/${userName}`, options);
		// const user = await res.json();
		// console.log(user);
		if (res.status === 204) {
			alert('User has been removed');
			window.location.reload();
		} else {
			console.log('Error L 39');
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = { showUserById, removeUserModal };
