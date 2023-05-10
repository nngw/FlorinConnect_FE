const displayAllUsersBtn = document.getElementById('displayAllUsers');
const showUsers = document.getElementById('showUsers');

const createUser = (data, results) => {
	results.innerHTML = '';
	data.forEach(async (data) => {
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
	});
};

const allUsers = displayAllUsersBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/users');
		const users = await res.json();
		console.log(users);
		createUser(users, showUsers);
	} catch (error) {
		console.error(error);
	}
});

module.exports = { allUsers, createUser };
