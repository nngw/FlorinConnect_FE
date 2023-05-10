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
		await fetch('https://florinconnectapi.onrender.com/posts', options);
	} catch (error) {
		console.error(error);
	}
});

module.exports = { addPostAdmin };
