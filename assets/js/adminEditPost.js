// const { createPosts } = require('./admin');
const FormEditPostModal = document.getElementById('FormEditPostModal');

CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds8r4pvb0/upload';
CLOUDINARY_UPLOAD_PRESET = 'n7vsyexp';

const imgPreview = document.getElementById('img-preview');
const fileUpload = document.getElementById('file-upload');

let url = '';

fileUpload.addEventListener('change', (e) => {
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
			imgPreview.src = res.data.secure_url;
			url = res.data.secure_url;
			return url;
		})
		.catch((err) => console.error(err));
});

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
			image_url: url,
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
