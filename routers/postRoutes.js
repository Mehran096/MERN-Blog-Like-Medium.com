const app = require ('express');
const { postController, getController, getSinglePost, postUpdateController, updateValidation, updateImageController, deletePost, homePost, homeDetailsPost, commnetControl, deleteComment } = require('../controllers/postController');
const auth = require('../utils/auth');
const router = app.Router()

//create post
router.post('/post_create', auth,  postController )
//get posts
router.get('/posts/:id/:page', auth, getController)
//get post
router.get('/post/:id', auth, getSinglePost)
//update post
router.post('/updatePost', [auth, updateValidation], postUpdateController)
//update post image
router.post('/updateImage', auth, updateImageController)
//delete post
router.get('/delete/:id', auth, deletePost);
//Home Post
router.get('/home/:page', homePost);
//Home Post details
router.get('/explore/:id', homeDetailsPost)
//comment
router.post('/comment', commnetControl)
//delete Comment
router.get('/deleter/:id',  deleteComment);

module.exports = router;
