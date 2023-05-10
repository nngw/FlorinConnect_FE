// Get the form element and add an event listener for form submission
const searchFormDate = document.getElementById('search-form-date');
const searchFormBetween = document.getElementById('search-form-between');
const searchFormWord = document.getElementById('search-form-word');
const searchFormCategory = document.getElementById('search-form-category');
const searchFormStatus = document.getElementById('search-form-status');
const clearFilters = document.getElementById('clearAllFilters')

const results = document.getElementById('search-results-date');

const createPosts = (data) => {
	results.innerHTML = '';
	data.forEach((post) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 200px; height: 100%; width: 100%; border: solid 2px #404040');

		const img = document.createElement('img');
		img.className = 'card-img-top';
		const image_url = post.image_url || 'https://images.unsplash.com/photo-1609087998060-f567d481a1ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
		img.setAttribute('src', `${image_url}`);
		img.setAttribute('style', 'object-fit: cover; width: 15%; height: 200px; display: flex; align-items: center; justify-items: center;');
		img.setAttribute('alt', 'Post image');
		card.appendChild(img);

		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.setAttribute('style', 'width: 100%; min-height: 100%; background-color: #404040; color: #fff;');
		card.appendChild(cardBody);
		
		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.setAttribute('style', 'font-weight:600;')
		cardHeading.textContent = post.title;
		cardBody.appendChild(cardHeading);

		const cardParagraph = document.createElement('p');
		cardParagraph.className = 'card-text';
		cardParagraph.textContent = post.content;
		cardBody.appendChild(cardParagraph);

		const cardFooter = document.createElement('div');
		cardFooter.className = 'post-task-button';
		cardFooter.setAttribute('style', 'width: 20%; min-height: 100%; background-color: #404040; color: #fff; border-radius:0px;');
		card.appendChild(cardFooter);

		const cardStatusDisplay = document.createElement('div');
		cardStatusDisplay.className = 'card-footer';		

		const cardButton = document.createElement('a');
		console.log(post.accepted)

		if (post.completed === true){
			cardButton.classList.add('btn', 'carousel-button', 'status-task-buttons');
			cardButton.innerHTML = 'Task<br>Completed';
			cardFooter.appendChild(cardButton);	
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#94FBAB;');
		} else if (post.accepted === true) {
			cardButton.classList.add('btn', 'carousel-button', 'status-task-buttons');
			cardButton.setAttribute('href', '../../index.html');
			cardButton.innerHTML = 'Mark as<br>completed';
			cardFooter.appendChild(cardButton);
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#7D84B2;');
		} else if (post.open === true) {
			cardButton.classList.add('btn', 'carousel-button', 'status-task-buttons');
			cardButton.setAttribute('href', '../../index.html');
			cardButton.innerHTML = 'Accept<br>task';
			cardFooter.appendChild(cardButton);
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#ED254E;');
		}
		// cardButton.setAttribute('style', 'display: ;');
		card.appendChild(cardStatusDisplay);
		
		
		results.appendChild(card);
	});
};

window.addEventListener('load', async (e) => {
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

searchFormWord.addEventListener('input', async (e) => {
	e.preventDefault();

	try {
		const word = document.getElementById('word').value.toLowerCase();
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

clearFilters.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts")
		const posts = await res.json();
		createPosts(posts)
	} catch (error) {
		console.error('error');
	}
})
