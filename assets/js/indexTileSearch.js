const filterIndexVolunteerTaskClick = document.getElementById('index-volunteer-cat-card');
const filterIndexSocialTaskClick = document.getElementById('index-social-cat-card');
const filterIndexRecyclingTaskClick = document.getElementById('index-recycling-cat-card');
const filterIndexWorkshopTaskClick = document.getElementById('index-workshop-cat-card');

filterIndexRecyclingTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();
	my_url = 'board.html?recycling'
	
	document.onclick = await function () {
		window.location.replace(my_url);	
	}

})
filterIndexSocialTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();
	my_url = 'board.html?social'
	
	document.onclick = await function () {
		window.location.replace(my_url);	
	}

})

filterIndexVolunteerTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();
	my_url = 'board.html?volunteer'
	
	document.onclick = await function () {
		window.location.replace(my_url);	
	}

})

filterIndexWorkshopTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();
	my_url = 'board.html?workshop'
	
	document.onclick = await function () {
		window.location.replace(my_url);	
	}

})



