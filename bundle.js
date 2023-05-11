(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// const addPost = require('./adminAddPost');

const displayResults = document.getElementById('displayResults');
const displayAllPosts = document.getElementById('displayAllPosts');
const displayAllUsers = document.getElementById('displayAllUsers');
// const FormAddPostModal = document.getElementById('FormAddPostModal');

const createPosts = (data) => {
	displayResults.innerHTML = '';
	data.forEach(async (post) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 15rem; height: 100%; width: 100%;');
		// card.setAttribute('style', 'width: 49%');

		const img = document.createElement('img');
		img.className = 'card-img-top';
		img.setAttribute('src', `${post.image_url}`);
		img.setAttribute('style', 'width: 40%');
		img.setAttribute('alt', 'Post image');
		card.appendChild(img);

		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
		card.appendChild(cardBody);

		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.textContent = post.title + ' #' + post.id;
		cardBody.appendChild(cardHeading);

		const cardParagraph = document.createElement('p');
		cardParagraph.className = 'card-text';
		cardParagraph.textContent = post.content;
		cardBody.appendChild(cardParagraph);

		const cardCreatedBy = document.createElement('p');
		cardCreatedBy.className = 'card-text';
		cardCreatedBy.textContent = 'Added by: ' + post.added_by;
		if (post.added_by === undefined) {
			cardCreatedBy.textContent = 'Added by: admin';
		}

		cardBody.appendChild(cardCreatedBy);

		const cardAcceptedBy = document.createElement('p');
		cardAcceptedBy.className = 'card-text';
		cardAcceptedBy.textContent = 'Accepted By: ' + (await getUserByUsername(post.accepted_by_id));

		if ((await getUserByUsername(post.accepted_by_id)) === undefined) {
			cardAcceptedBy.textContent = 'Accepted By: -';
		}

		cardBody.appendChild(cardAcceptedBy);

		const cardDateCreated = document.createElement('p');
		cardDateCreated.className = 'card-text';
		cardDateCreated.textContent = 'Date Created: ' + post.date_created;
		cardBody.appendChild(cardDateCreated);

		const cardStatus = document.createElement('p');
		cardStatus.className = 'card-text';
		cardStatus.textContent = 'Status: ' + (await checkStatus(post));
		cardBody.appendChild(cardStatus);

		if (post.accepted) {
			card.setAttribute('style', 'border-right: solid 10px green');
		}
		if (post.completed) {
			card.setAttribute('style', 'border-right: solid 10px #a62639');
		}

		displayResults.appendChild(card);
	});
};

const checkStatus = async (post) => {
	let arr = [];
	if (post.open) {
		arr.push('Open');
	}
	if (post.accepted) {
		arr.push('Accepted');
	}
	if (post.completed) {
		arr.push('Completed');
	}
	return arr.join(', ');
};

const getUserByUsername = async (id) => {
	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${id}`);
		const user = await res.json();
		return user.username;
	} catch (error) {
		console.error(error);
	}
};

const getPostById = async (id) => {
	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${id}`);
		const post = await res.json();
		return post;
	} catch (error) {
		console.error(error);
	}
};

const display = displayAllPosts.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/posts');
		const posts = await res.json();
		createPosts(posts);
	} catch (error) {
		console.error(error);
	}
});

module.exports = { display, createPosts, getPostById, getUserByUsername, checkStatus };

// FormAddPostModal.addEventListener('submit', addPost());

},{}],2:[function(require,module,exports){
const FormAddAdmin = document.getElementById('FormAddAdmin');
const displayResults = document.getElementById('showUser');
const showUserBtn = document.getElementById('showUserBtn');
const id = document.getElementById('idAddAdmin');

const showUser = showUserBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const userId = id.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${userId}`);
		const user = await res.json();
		createUser(user, displayResults);
	} catch (error) {
		alert(error);
	}
});

const addAdmin = FormAddAdmin.addEventListener('submit', async (e) => {
	e.preventDefault();

	const userId = id.value;

	const options = {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			admin: document.getElementById('admin').checked,
		}),
	};

	try {
		const res = await fetch(`https://florinconnectapi.onrender.com/users/${userId}`, options);
		if (res.status === 200) {
			alert('Admin added');
			window.location.reload();
		} else {
			alert(res.error);
		}
	} catch (error) {
		console.error(error);
	}
});

const createUser = async (data, results) => {
	results.innerHTML = '';

	const card = document.createElement('div');
	card.classList.add('card', 'flex-row', 'mb-4');
	card.setAttribute('style', 'min-height: 10rem; height: 100%; width: 100%;');

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';
	cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
	card.appendChild(cardBody);

	const cardHeading = document.createElement('h5');
	cardHeading.className = 'card-title';
	cardHeading.textContent = data.username + ' #' + data.id;
	cardBody.appendChild(cardHeading);

	const cardParagraph = document.createElement('p');
	cardParagraph.className = 'card-text';
	cardParagraph.textContent = 'Admin: ' + data.admin;
	cardBody.appendChild(cardParagraph);

	if (data.admin) {
		card.setAttribute('style', 'border-right: solid 10px green');
	}

	const cardDateCreated = document.createElement('p');
	cardDateCreated.className = 'card-text';
	cardDateCreated.textContent = 'Points: ' + data.points;
	cardBody.appendChild(cardDateCreated);

	results.appendChild(card);
};

module.exports = { showUser, addAdmin, createUser };

},{}],3:[function(require,module,exports){
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

},{"dotenv":11}],4:[function(require,module,exports){
const displayAllUsersBtn = document.getElementById('displayAllUsers');
const showUsers = document.getElementById('showUsers');

const createUser = (data, results) => {
	results.innerHTML = '';
	data.forEach(async (data) => {
		const card = document.createElement('div');
		card.classList.add('card', 'flex-row', 'mb-4');
		card.setAttribute('style', 'min-height: 10rem; height: 100%; width: 100%;');

		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
		card.appendChild(cardBody);

		const cardHeading = document.createElement('h5');
		cardHeading.className = 'card-title';
		cardHeading.textContent = data.username + ' #' + data.id;
		cardBody.appendChild(cardHeading);

		const cardParagraph = document.createElement('p');
		cardParagraph.className = 'card-text';
		cardParagraph.textContent = 'Admin: ' + data.admin;
		cardBody.appendChild(cardParagraph);

		if (data.admin) {
			card.setAttribute('style', 'border-right: solid 10px green');
		}

		const cardDateCreated = document.createElement('p');
		cardDateCreated.className = 'card-text';
		cardDateCreated.textContent = 'Points: ' + data.points;
		cardBody.appendChild(cardDateCreated);

		results.appendChild(card);
	});
};

const allUsers = displayAllUsersBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const res = await fetch('https://florinconnectapi.onrender.com/users');
		const users = await res.json();
		console.log(users);
		createUser(users, showUsers);
	} catch (error) {
		console.error(error);
	}
});

module.exports = { allUsers, createUser };

},{}],5:[function(require,module,exports){
const showAllBtn = document.getElementById('showAllBtn');
const FormDeletePostModal = document.getElementById('FormDeletePostModal');
const id = document.getElementById('idDelete');
const displayResults = document.getElementById('showPosts');

const showPostByIdAdmin = showAllBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const postId = id.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`);
		const post = await res.json();

		createPost(post, displayResults);
		// displayResults.appendChild(post);
	} catch (error) {
		alert(error);
	}
});

const deletePostModal = FormDeletePostModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	try {
		const postId = id.value;

		const res = await fetch(`https://florinconnectapi.onrender.com/posts/${postId}`, options);
		const post = await res.json();

		if (res.status === 200) {
			alert('Post has been deleted');
			window.location.reload();
		} else {
			alert(post.error);
		}
	} catch (error) {
		console.error(error);
	}
});

const createPost = async (data, displayResults) => {
	displayResults.innerHTML = '';

	const card = document.createElement('div');
	card.classList.add('card', 'flex-row', 'mb-4');
	card.setAttribute('style', 'min-height: 10rem; height: 100%; width: 100%;');

	const img = document.createElement('img');
	img.className = 'card-img-top';
	img.setAttribute('src', `${data.image_url}`);
	img.setAttribute('style', 'width: 40%');
	img.setAttribute('alt', 'Post image');
	card.appendChild(img);

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';
	cardBody.setAttribute('style', 'width: 100%; min-height: 100%');
	card.appendChild(cardBody);

	const cardHeading = document.createElement('h5');
	cardHeading.className = 'card-title';
	cardHeading.textContent = data.title + ' #' + data.id;
	cardBody.appendChild(cardHeading);

	const cardParagraph = document.createElement('p');
	cardParagraph.className = 'card-text';
	cardParagraph.textContent = data.content;
	cardBody.appendChild(cardParagraph);

	const cardDateCreated = document.createElement('p');
	cardDateCreated.className = 'card-text';
	cardDateCreated.textContent = 'Date Created: ' + data.date_created;
	cardBody.appendChild(cardDateCreated);

	if (data.accepted) {
		card.setAttribute('style', 'border-right: solid 10px green');
	}
	if (data.completed) {
		card.setAttribute('style', 'border-right: solid 10px #a62639');
	}

	displayResults.appendChild(card);
};

module.exports = { createPost, showPostByIdAdmin, deletePostModal };

},{}],6:[function(require,module,exports){
const showAllUsersBtn = document.getElementById('showAllUsersBtn');
const FormDeleteUserModal = document.getElementById('FormDeleteUserModal');
const username = document.getElementById('usernameDeleteUser');
const displayResults = document.getElementById('showAllUsers');
const { createUser } = require('./adminAddAdmin');

const showUserById = showAllUsersBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	try {
		const userName = username.value;
		const res = await fetch(`https://florinconnectapi.onrender.com/users/name/${userName}`);
		const user = await res.json();
		createUser(user, displayResults);
	} catch (error) {
		alert(error);
	}
});

const removeUserModal = FormDeleteUserModal.addEventListener('submit', async (e) => {
	e.preventDefault();

	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	try {
		const userName = username.value;

		const res = await fetch(`https://florinconnectapi.onrender.com/users/name/${userName}`, options);

		if (res.status === 204) {
			alert('User has been removed');
			window.location.reload();
		} else {
			console.log('Error L 39');
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = { showUserById, removeUserModal };

},{"./adminAddAdmin":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./adminDeletePost":5}],9:[function(require,module,exports){
const { display } = require('./assets/js/admin');
const { addPostAdmin } = require('./assets/js/adminAddPost');
const { editPostAdmin } = require('./assets/js/adminEditPost');
const { showPostByIdAdmin, deletePostModal } = require('./assets/js/adminDeletePost');
const { showPostStatusAdmin, editPostStatusAdmin } = require('./assets/js/adminEditPostStatus');
const { allUsers } = require('./assets/js/adminAllUsers');
const { showUser, addAdmin } = require('./assets/js/adminAddAdmin');
const { showUserById, removeUserModal } = require('./assets/js/adminDeleteUser');

// const {
// 	createUserPosts, populateAllPosts, searchByFormDates, searchByDateRange, searchByWord, searchByCategory, searchByStatus, clearAllFilters
// } = require('./assets/js/search');

display;
addPostAdmin;
editPostAdmin;
showPostByIdAdmin;
deletePostModal;
showPostStatusAdmin;
editPostStatusAdmin;
allUsers;
showUser;
addAdmin;
showUserById;
removeUserModal;

},{"./assets/js/admin":1,"./assets/js/adminAddAdmin":2,"./assets/js/adminAddPost":3,"./assets/js/adminAllUsers":4,"./assets/js/adminDeletePost":5,"./assets/js/adminDeleteUser":6,"./assets/js/adminEditPost":7,"./assets/js/adminEditPostStatus":8}],10:[function(require,module,exports){

},{}],11:[function(require,module,exports){
(function (process){(function (){
const fs = require('fs')
const path = require('path')
const os = require('os')
const packageJson = require('../package.json')

const version = packageJson.version

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parser src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _log (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`)
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options) {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)

  if (options) {
    if (options.path != null) {
      dotenvPath = _resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
  }

  try {
    // Specifying an encoding returns a string instead of a buffer
    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else {
        if (override === true) {
          process.env[key] = parsed[key]
        }

        if (debug) {
          if (override === true) {
            _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`)
          } else {
            _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`)
          }
        }
      }
    })

    return { parsed }
  } catch (e) {
    if (debug) {
      _log(`Failed to load ${dotenvPath} ${e.message}`)
    }

    return { error: e }
  }
}

const DotenvModule = {
  config,
  parse
}

module.exports.config = DotenvModule.config
module.exports.parse = DotenvModule.parse
module.exports = DotenvModule

}).call(this)}).call(this,require('_process'))
},{"../package.json":12,"_process":15,"fs":10,"os":13,"path":14}],12:[function(require,module,exports){
module.exports={
  "name": "dotenv",
  "version": "16.0.3",
  "description": "Loads environment variables from .env file",
  "main": "lib/main.js",
  "types": "lib/main.d.ts",
  "exports": {
    ".": {
      "require": "./lib/main.js",
      "types": "./lib/main.d.ts",
      "default": "./lib/main.js"
    },
    "./config": "./config.js",
    "./config.js": "./config.js",
    "./lib/env-options": "./lib/env-options.js",
    "./lib/env-options.js": "./lib/env-options.js",
    "./lib/cli-options": "./lib/cli-options.js",
    "./lib/cli-options.js": "./lib/cli-options.js",
    "./package.json": "./package.json"
  },
  "scripts": {
    "dts-check": "tsc --project tests/types/tsconfig.json",
    "lint": "standard",
    "lint-readme": "standard-markdown",
    "pretest": "npm run lint && npm run dts-check",
    "test": "tap tests/*.js --100 -Rspec",
    "prerelease": "npm test",
    "release": "standard-version"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/motdotla/dotenv.git"
  },
  "keywords": [
    "dotenv",
    "env",
    ".env",
    "environment",
    "variables",
    "config",
    "settings"
  ],
  "readmeFilename": "README.md",
  "license": "BSD-2-Clause",
  "devDependencies": {
    "@types/node": "^17.0.9",
    "decache": "^4.6.1",
    "dtslint": "^3.7.0",
    "sinon": "^12.0.1",
    "standard": "^16.0.4",
    "standard-markdown": "^7.1.0",
    "standard-version": "^9.3.2",
    "tap": "^15.1.6",
    "tar": "^6.1.11",
    "typescript": "^4.5.4"
  },
  "engines": {
    "node": ">=12"
  }
}

},{}],13:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],14:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":15}],15:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[9]);
