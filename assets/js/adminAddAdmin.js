const FormAddAdmin = document.getElementById('FormAddAdmin');
const displayResults = document.getElementById('showUser');
const showUserBtn = document.getElementById('showUserBtn');
const id = document.getElementById('idAddAdmin');

const showUser = showUserBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const userId = id.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${userId}`);
		const user = await res.json();
		createUser(user, displayResults);
	} catch (error) {
		alert(error);
	}
});

const addAdmin = FormAddAdmin.addEventListener('submit', async (e) => {
	e.preventDefault();

	const userId = id.value;

	const options = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			admin: document.getElementById('admin').checked,
		}),
	};

	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${userId}`, options);
		if (res.status === 200) {
			alert('Admin added');
			window.location.reload();
		} else {
			alert(res.error);
		}
	} catch (error) {
		console.error(error);
	}
});

const createUser = async (data, results) => {
	results.innerHTML = '';

	const card = document.createElement('div');
	card.classList.add('card', 'flex-row', 'mb-4');
	card.setAttribute('style', 'min-height: 10rem; height: 100%; width: 100%;');

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';
	cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
	card.appendChild(cardBody);

	const cardHeading = document.createElement('h5');
	cardHeading.className = 'card-title';
	cardHeading.textContent = data.username + ' #' + data.id;
	cardBody.appendChild(cardHeading);

	const cardParagraph = document.createElement('p');
	cardParagraph.className = 'card-text';
	cardParagraph.textContent = 'Admin: ' + data.admin;
	cardBody.appendChild(cardParagraph);

	if (data.admin) {
		card.setAttribute('style', 'border-right: solid 10px green');
	}

	const cardDateCreated = document.createElement('p');
	cardDateCreated.className = 'card-text';
	cardDateCreated.textContent = 'Points: ' + data.points;
	cardBody.appendChild(cardDateCreated);

	results.appendChild(card);
};

module.exports = { showUser, addAdmin, createUser };
