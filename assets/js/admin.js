// const addPost = require('./adminAddPost');

const displayResults = document.getElementById('displayResults');
const displayAllPosts = document.getElementById('displayAllPosts');
const displayAllUsers = document.getElementById('displayAllUsers');
// const FormAddPostModal = document.getElementById('FormAddPostModal');

const createPosts = (data) => {
	displayResults.innerHTML = '';
	data.forEach(async (post) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 15rem; height: 100%; width: 100%;');
		// card.setAttribute('style', 'width: 49%');

		const img = document.createElement('img');
		img.className = 'card-img-top';
		const image_url =
			post.image_url ||
			'https://images.unsplash.com/photo-1609087998060-f567d481a1ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
		img.setAttribute('src', `${image_url}`);
		img.setAttribute('style', 'width: 40%');
		img.setAttribute('alt', 'Post image');
		card.appendChild(img);

		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
		card.appendChild(cardBody);

		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.textContent = post.title + ' #' + post.id;
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

		const cardStatus = document.createElement('p');
		cardStatus.className = 'card-text';
		cardStatus.textContent = 'Status: ' + (await checkStatus(post));
		cardBody.appendChild(cardStatus);

		if (post.accepted) {
			card.setAttribute('style', 'border-right: solid 10px green');
		}
		if (post.completed) {
			card.setAttribute('style', 'border-right: solid 10px #a62639');
		}

		displayResults.appendChild(card);
	});
};

const checkStatus = async (post) => {
	let arr = [];
	if (post.open) {
		arr.push('Open');
	}
	if (post.accepted) {
		arr.push('Accepted');
	}
	if (post.completed) {
		arr.push('Completed');
	}
	return arr.join(', ');
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

const getPostById = async (id) => {
	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${id}`);
		const post = await res.json();
		return post;
	} catch (error) {
		console.error(error);
	}
};

const display = displayAllPosts.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/posts');
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

document.getElementById('logout').addEventListener('click', async (e) => {
	e.preventDefault();

	const token = localStorage.getItem('token');

	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/tokens/delete/${token}`, options);

		if (res.status === 204) {
			localStorage.removeItem('token');
			alert('Token has been removed');
			window.location.href = 'index.html';
		} else {
			console.log('Error L 39');
		}
	} catch (error) {
		console.log('Can not delete token from db - ADMIN');
		console.error(error);
	}
});

window.onload = async function (e) {
	e.preventDefault();

	const token = localStorage.getItem('token');
	try {
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};
		const res = await fetch(`https://florinconnectapi.onrender.com/tokens/admin/${token}`, options);
		const user = await res.json();
		if (user.admin) {
			document.getElementById('user-img').src = './assets/images/admin.png';
		} else {
			document.getElementById('user-img').src = './assets/images/user.png';
		}
	} catch (error) {
		console.log('Can not find out if it is an admin');
		console.error(error);
	}
};

module.exports = { display, createPosts, getPostById, getUserByUsername, checkStatus };

// FormAddPostModal.addEventListener('submit', addPost());
