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
		console.log(post);
		createPost(post, displayResults);
		// displayResults.appendChild(post);
	} catch (error) {
		alert(error);
	}
});

const DeletePostModal = FormDeletePostModal.addEventListener('submit', async (e) => {
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
		console.log(postId);
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`, options);
		const post = await res.json();

		if (res.status == 200) {
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

module.exports = { createPost, showPostByIdAdmin, DeletePostModal };
