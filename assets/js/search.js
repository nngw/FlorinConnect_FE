// const { create } = require("domain");

// Get the form element and add an event listener for form submission
const searchFormDate = document.getElementById('search-form-date');
const searchFormBetween = document.getElementById('search-form-between');
const searchFormWord = document.getElementById('search-form-word');
const searchFormCategory = document.getElementById('search-form-category');
const searchFormStatus = document.getElementById('search-form-status');
const clearFilters = document.getElementById('clearAllFilters');
const filterVolunteerTaskClick = document.getElementById('volunteer-cat-card');
const filterSocialTaskClick = document.getElementById('social-cat-card');const filterRecyclingTaskClick = document.getElementById('recycling-cat-card');
const filterWorkshopTaskClick = document.getElementById('workshop-cat-card');

const results = document.getElementById('search-results-date');

const createUserPosts = (data) => {
	results.innerHTML = '';
	data.forEach((post) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 300px; height: 100%; width: 100%; border: solid 2px #404040');

		const img = document.createElement('img');
		img.className = 'card-img-top';
		const image_url = post.image_url || 'https://images.unsplash.com/photo-1609087998060-f567d481a1ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
		img.setAttribute('src', `${image_url}`);
		img.setAttribute('style', 'object-fit: cover; width: 20%; height: 300px; display: flex; align-items: center; justify-items: center;');
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

		const cardCategory = document.createElement('p');
		cardCategory.className = 'card-text';
		cardCategory.textContent = 'Category: ' +post.category;
		cardBody.appendChild(cardCategory);

		const cardDateCreated = document.createElement('p');
		cardDateCreated.className = 'card-text';
		cardDateCreated.textContent = 'Date Created: ' + post.date_created;
		cardBody.appendChild(cardDateCreated);
		
		const cardCreatedBy = document.createElement('p');
		cardCreatedBy.className = 'card-text';
		cardCreatedBy.textContent = 'Added by: ' + post.added_by;
		if (post.added_by === undefined) {
			cardCreatedBy.textContent = 'Added by: Admin';
		}
		cardBody.appendChild(cardCreatedBy);

		const cardFooter = document.createElement('div');
		cardFooter.className = 'post-task-button';
		cardFooter.setAttribute('style', 'width: 20%; min-height: 100%; background-color: #404040; color: #fff; border-radius:0px;');
		card.appendChild(cardFooter);

		const cardStatusDisplay = document.createElement('div');
		cardStatusDisplay.className = 'card-footer';		
		cardStatusDisplay.setAttribute('id', "clickedPostId")
		const cardButton = document.createElement('a');
		
		const idStatusDisplay = document.createElement('p');
		idStatusDisplay.setAttribute('class', 'idStatusDisplay')
		idStatusDisplay.textContent = post.id
		cardStatusDisplay.appendChild(idStatusDisplay)
		

		if (post.completed === true){	
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#94FBAB;');
		} else if (post.accepted === true) {
			cardButton.classList.add('btn', 'carousel-button'); 
			cardButton.innerHTML = 'Mark as<br>completed';
			cardFooter.appendChild(cardButton);
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#7D84B2;');
		} else if (post.open === true) {
			cardButton.classList.add('btn', 'carousel-button', 'status-task-buttons');
			cardButton.innerHTML = 'Accept<br>task';
			cardFooter.appendChild(cardButton);
			cardStatusDisplay.setAttribute('style', 'border-radius:0px;background-color:#ED254E;');
		}

		cardButton.addEventListener('click', async (e) => {
			const id = getID(e.srcElement.offsetParent.innerText)
			const options = {
				method: 'PATCH',
				headers: {
				  Accept: 'application/json',
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				  accepted: "true",
				}),
			  };

			  try {
				const res = await fetch(`http://localhost:3000/posts/changestatus/${id}`, options)
				window.location.reload();
				} catch (error) {
				  console.error(error);
				}
		})

		const getID = (text) => {
			const array = text.split("\n");
			const lastElement = array.pop();
			return lastElement
		}

		card.appendChild(cardStatusDisplay);
		results.appendChild(card);
	});
};

window.addEventListener('load', async (e) => {
	try {
		const res = await fetch("http://localhost:3000/posts")
		const posts = await res.json();
		createUserPosts(posts)
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
		createUserPosts(posts);
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
		createUserPosts(posts);
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
		createUserPosts(posts);
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
		createUserPosts(posts);
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
		createUserPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

clearFilters.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts")
		const posts = await res.json();
		createUserPosts(posts)
	} catch (error) {
		console.error('error');
	}
})

filterVolunteerTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts/category/Volunteer")
		const posts = await res.json();
		createUserPosts(posts)
	} catch (error) {
		console.error('error');
	}
})

filterSocialTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts/category/Social")
		const posts = await res.json();
		createUserPosts(posts)
	} catch (error) {
		console.error('error');
	}
})

filterRecyclingTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts/category/Job")
		const posts = await res.json();
		createUserPosts(posts)
	} catch (error) {
		console.error('error');
	}
})

filterWorkshopTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch("http://localhost:3000/posts/category/Workshop")
		const posts = await res.json();
		createUserPosts(posts)
	} catch (error) {
		console.error('error');
	}
})



// module.exports = {
// 	createUserPosts, populateAllPosts, searchByFormDates, searchByDateRange, searchByWord, searchByCategory, searchByStatus, clearAllFilters
// }
