require('dotenv').config();
const FormAddPostModal = document.getElementById('FormAddPostModal');

const api_key = proces.env.CLOUDAPIKEY;
const cloud_name = proces.env.CLOUDNAME;

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
			image_url: form.get('image'),
		}),
	};

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/posts', options);
		const data = await res.json();

		if (res.status == 201) {
			alert('Post has been created');
			window.location.reload();
		} else {
			alert(data.error);
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = { addPostAdmin };
