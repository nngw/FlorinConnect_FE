// Get the form element and add an event listener for form submission
const searchForm = document.getElementById('search-form');
const results = document.getElementById('search-results');

searchForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchInput = document.getElementById('search');
	const searchValue = searchInput.value;
	const url = `http://localhost:3000/posts/date/${searchValue}`;
	await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// resultsList.innerHTML = '';
			data.forEach(async (post) => {
				console.log(post);
				console.log(post.image_url);
				const card = document.createElement('div');
				card.classList.add('card', 'flex-row', 'mb-4');
				card.setAttribute('style', 'height: 15rem; width: 49%;');
				// card.setAttribute('style', 'width: 49%');

				const img = document.createElement('img');
				img.className = 'card-img-top';
				img.setAttribute('src', `${post.image_url}`);
				img.setAttribute('style', 'width: 40%');
				img.setAttribute('alt', 'Post image');
				card.appendChild(img);

				const cardBody = document.createElement('div');
				cardBody.className = 'card-body';
				cardBody.setAttribute('style', 'width: 50%');
				card.appendChild(cardBody);

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
		})
		.catch((error) => {
			console.error(error);
		});
});
