// Get the form element and add an event listener for form submission
const searchFormDate = document.getElementById('search-form-date');
const searchFormBetween = document.getElementById('search-form-between');
const searchFormWord = document.getElementById('search-form-word');
const searchFormCategory = document.getElementById('search-form-category');
const searchFormStatus = document.getElementById('search-form-status');

const results = document.getElementById('search-results-date');

const createPosts = (data) => {
	results.innerHTML = '';
	data.forEach((post) => {
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

		if (post.accepted) {
			cardBody.setAttribute('style', 'background: green');
		}
		if (post.completed) {
			cardBody.setAttribute('style', 'background: red');
		}

		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.textContent = post.title;
		cardBody.appendChild(cardHeading);

		const cardParagraph = document.createElement('p');
		cardParagraph.className = 'card-text';
		cardParagraph.textContent = post.content;
		cardBody.appendChild(cardParagraph);

		const cardButton = document.createElement('a');
		cardButton.classList.add('btn', 'btn-primary');
		cardButton.setAttribute('href', '../../index.html');
		cardButton.innerHTML = 'Find out more';
		cardBody.appendChild(cardButton);

		results.appendChild(card);
	});
};

addEventListener('load', async (e) => {
	try {
		const res = await fetch("http://localhost:3000/posts")
		const posts = await res.json();
		createPosts(posts)
	} catch (error) {
		console.error('error');
	}
})

searchFormDate.addEventListener('submit', async (e) => {
	e.preventDefault();

	try {
		const searchInput = document.getElementById('search-date');
		const searchValue = searchInput.value;
		const res = await fetch(`http://localhost:3000/posts/date/${searchValue}`);
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error('error');
	}
});

searchFormBetween.addEventListener('submit', async (e) => {
	e.preventDefault();

	try {
		const startDate = document.getElementById('start-date').value;
		const endDate = document.getElementById('end-date').value;
		const res = await fetch(`http://localhost:3000/posts/date/${startDate}/${endDate}`);
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

searchFormWord.addEventListener('submit', async (e) => {
	e.preventDefault();

	try {
		const word = document.getElementById('word').value;
		const res = await fetch(`http://localhost:3000/posts/word/${word}`);
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

searchFormCategory.addEventListener('submit', async (e) => {
	e.preventDefault();

	try {
		const category = document.getElementById('category').value;
		const res = await fetch(`http://localhost:3000/posts/category/${category}`);
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

searchFormStatus.addEventListener('submit', async (e) => {
	e.preventDefault();

	try {
		const status = document.getElementById('status').value;
		const res = await fetch(`http://localhost:3000/posts/status/${status}`);
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});
