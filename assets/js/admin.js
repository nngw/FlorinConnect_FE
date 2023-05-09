const displayResults = document.getElementById('displayResults');
const displayAllPosts = document.getElementById('displayAllPosts');
const displayAllUsers = document.getElementById('displayAllUsers');

const createPosts = (data) => {
	displayResults.innerHTML = '';
	data.forEach(async (post) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 15rem; height: 100%; width: 635px;');
		// card.setAttribute('style', 'width: 49%');

		const img = document.createElement('img');
		img.className = 'card-img-top';
		img.setAttribute('src', `${post.image_url}`);
		img.setAttribute('style', 'width: 40%');
		img.setAttribute('alt', 'Post image');
		card.appendChild(img);

		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.setAttribute('style', 'width: 50%; min-height: 100%');
		card.appendChild(cardBody);

		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.textContent = post.title;
		cardBody.appendChild(cardHeading);

		const cardParagraph = document.createElement('p');
		cardParagraph.className = 'card-text';
		cardParagraph.textContent = post.content;
		cardBody.appendChild(cardParagraph);

		const cardCreatedBy = document.createElement('p');
		cardCreatedBy.className = 'card-text';
		cardCreatedBy.textContent = 'Added by: ' + post.added_by;
		if (post.added_by === undefined) {
			cardCreatedBy.textContent = 'Added by: admin';
		}

		cardBody.appendChild(cardCreatedBy);

		if (post.accepted) {
			cardBody.setAttribute('style', 'border: solid 2px green');
		}
		if (post.completed) {
			cardBody.setAttribute('style', 'border: solid 2px red');
		}

		const cardAcceptedBy = document.createElement('p');
		cardAcceptedBy.className = 'card-text';
		cardAcceptedBy.textContent = 'Accepted By: ' + (await getUserByUsername(post.accepted_by_id));

		if ((await getUserByUsername(post.accepted_by_id)) === undefined) {
			cardAcceptedBy.textContent = 'Accepted By: -';
		}

		cardBody.appendChild(cardAcceptedBy);

		const cardDateCreated = document.createElement('p');
		cardDateCreated.className = 'card-text';
		cardDateCreated.textContent = 'Date Created: ' + post.date_created;
		cardBody.appendChild(cardDateCreated);

		const cardButton = document.createElement('a');
		cardButton.classList.add('btn', 'btn-primary');
		cardButton.setAttribute('href', '../../index.html');
		cardButton.innerHTML = 'Find out more';
		cardBody.appendChild(cardButton);

		displayResults.appendChild(card);
	});
};

const getUserByUsername = async (id) => {
	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${id}`);
		const user = await res.json();
		return user.username;
	} catch (error) {
		console.error(error);
	}
};

displayAllPosts.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/posts');
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});
