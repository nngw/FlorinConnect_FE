const filterIndexVolunteerTaskClick = document.getElementById('index-recycling-cat-card');
const filterIndexSocialTaskClick = document.getElementById('index-social-cat-card');
const filterIndexRecyclingTaskClick = document.getElementById('index-recycling-cat-card');
const filterIndexWorkshopTaskClick = document.getElementById('index-workshop-cat-card');

filterIndexRecyclingTaskClick.addEventListener('click', async (e) => {
	e.preventDefault();
	console.log(e)
	function newLocation() {
        window.location.href="board.html";
    }

})
filterIndexSocialTaskClick
filterIndexVolunteerTaskClick
filterIndexWorkshopTaskClick
