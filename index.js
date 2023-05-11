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
