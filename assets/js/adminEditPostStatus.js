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
