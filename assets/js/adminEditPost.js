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
