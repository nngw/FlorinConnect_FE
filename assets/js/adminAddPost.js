const { FORMERR } = require('dns');

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

CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds8r4pvb0/upload';
CLOUDINARY_UPLOAD_PRESET = 'n7vsyexp';

const imgPreview = document.getElementById('img-preview');
const fileUpload = document.getElementById('file-upload');

const uploadImage = fileUpload.addEventListener('change', (e) => {
	const file = e.target.files[0];
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

	axios({
		url: CLOUDINARY_URL,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: formData,
	})
		.then((res) => {
			console.log(res);
			imgPreview.src = res.data.secure_url;
		})
		.catch((err) => console.error(err));
});

module.exports = { addPostAdmin };
