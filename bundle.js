(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
		img.setAttribute('src', `${post.image_url}`);
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

module.exports = { display, createPosts, getPostById, getUserByUsername, checkStatus };

// FormAddPostModal.addEventListener('submit', addPost());

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const FormAddPostModal = document.getElementById('FormAddPostModal');

const addPostAdmin = FormAddPostModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const form = new FormData(e.target);
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: form.get('title'),
			content: form.get('content'),
			category: form.get('category'),
		}),
	};

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/posts', options);
		const data = await res.json();

		if (res.status == 201) {
			alert('Post has been edited');
			window.location.reload();
		} else {
			alert(data.error);
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = { addPostAdmin };

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const showAllBtn = document.getElementById('showAllBtn');
const FormDeletePostModal = document.getElementById('FormDeletePostModal');
const id = document.getElementById('idDelete');
const displayResults = document.getElementById('showPosts');

const showPostByIdAdmin = showAllBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const postId = id.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`);
		const post = await res.json();

		createPost(post, displayResults);
		// displayResults.appendChild(post);
	} catch (error) {
		alert(error);
	}
});

const deletePostModal = FormDeletePostModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	try {
		const postId = id.value;

		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`, options);
		const post = await res.json();

		if (res.status === 200) {
			alert('Post has been deleted');
			window.location.reload();
		} else {
			alert(post.error);
		}
	} catch (error) {
		console.error(error);
	}
});

const createPost = async (data, displayResults) => {
	displayResults.innerHTML = '';

	const card = document.createElement('div');
	card.classList.add('card', 'flex-row', 'mb-4');
	card.setAttribute('style', 'min-height: 10rem; height: 100%; width: 100%;');

	const img = document.createElement('img');
	img.className = 'card-img-top';
	img.setAttribute('src', `${data.image_url}`);
	img.setAttribute('style', 'width: 40%');
	img.setAttribute('alt', 'Post image');
	card.appendChild(img);

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';
	cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
	card.appendChild(cardBody);

	const cardHeading = document.createElement('h5');
	cardHeading.className = 'card-title';
	cardHeading.textContent = data.title + ' #' + data.id;
	cardBody.appendChild(cardHeading);

	const cardParagraph = document.createElement('p');
	cardParagraph.className = 'card-text';
	cardParagraph.textContent = data.content;
	cardBody.appendChild(cardParagraph);

	const cardDateCreated = document.createElement('p');
	cardDateCreated.className = 'card-text';
	cardDateCreated.textContent = 'Date Created: ' + data.date_created;
	cardBody.appendChild(cardDateCreated);

	if (data.accepted) {
		card.setAttribute('style', 'border-right: solid 10px green');
	}
	if (data.completed) {
		card.setAttribute('style', 'border-right: solid 10px #a62639');
	}

	displayResults.appendChild(card);
};

module.exports = { createPost, showPostByIdAdmin, deletePostModal };

},{}],6:[function(require,module,exports){
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

},{"./adminAddAdmin":2}],7:[function(require,module,exports){
// const { createPosts } = require('./admin');
const FormEditPostModal = document.getElementById('FormEditPostModal');

const editPostAdmin = FormEditPostModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const postId = document.getElementById('id').value;

	const form = new FormData(e.target);
	const options = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: form.get('title'),
			content: form.get('content'),
			category: form.get('category'),
		}),
	};

	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`, options);
		if (res.status == 200) {
			alert('Post has been added');
			window.location.reload();
		} else {
			alert(data.error);
		}
	} catch (error) {
		console.error(error);
	}
});

// const getPostById = async (id) => {
// 	try {
// 		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${id}`);
// 		const post = await res.json();
// 		return post.rows[0];
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

module.exports = { editPostAdmin };

},{}],8:[function(require,module,exports){
const { createPost, showPostByIdAdmin } = require('./adminDeletePost');

const FormEditPostStatusModal = document.getElementById('FormEditPostStatusModal');
const displayResults = document.getElementById('showPostsEdit');
const showPostBtn = document.getElementById('showPostBtn');
const id = document.getElementById('idEditStatus');

const showPostStatusAdmin = showPostBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const postId = id.value;
		console.log(postId);
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`);
		const post = await res.json();
		console.log(post);
		createPost(post, displayResults);
		// displayResults.appendChild(post);
	} catch (error) {
		alert(error);
	}
});

const editPostStatusAdmin = FormEditPostStatusModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const postId = document.getElementById('idEditStatus').value;

	const options = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			completed: document.getElementById('completed').checked,
			open: 'false',
			accepted: 'false',
		}),
	};

	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`, options);
		// const data = await res.json();
		if (res.status == 200) {
			alert('Status has been updated');
			window.location.reload();
		} else {
			alert(res.error);
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = { showPostStatusAdmin, editPostStatusAdmin };

},{"./adminDeletePost":5}],9:[function(require,module,exports){
const { display } = require('./assets/js/admin');
const { addPostAdmin } = require('./assets/js/adminAddPost');
const { editPostAdmin } = require('./assets/js/adminEditPost');
const { showPostByIdAdmin, DeletePostModal } = require('./assets/js/adminDeletePost');
const { showPostStatusAdmin, editPostStatusAdmin } = require('./assets/js/adminEditPostStatus');
const { allUsers } = require('./assets/js/adminAllUsers');
const { showUser, addAdmin } = require('./assets/js/adminAddAdmin');
const { showUserById, removeUserModal } = require('./assets/js/adminDeleteUser');

display;
addPostAdmin;
editPostAdmin;
showPostByIdAdmin;
DeletePostModal;
showPostStatusAdmin;
editPostStatusAdmin;
allUsers;
showUser;
addAdmin;
showUserById;
removeUserModal;

},{"./assets/js/admin":1,"./assets/js/adminAddAdmin":2,"./assets/js/adminAddPost":3,"./assets/js/adminAllUsers":4,"./assets/js/adminDeletePost":5,"./assets/js/adminDeleteUser":6,"./assets/js/adminEditPost":7,"./assets/js/adminEditPostStatus":8}]},{},[9]);
