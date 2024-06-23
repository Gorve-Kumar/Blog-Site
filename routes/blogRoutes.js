const express = require('express');

const blogController = require('../controllers/blogController');
const router = express.Router();

/* router.get('/', (req, res) => {
    Blog.find().sort( {createdAt: -1}) // descending
    .then((result) => {
        // our index.ejs expects some blogs
        res.render('index', {title: 'Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    })
}); // INSTEAD OF THIS, USE "router.get('/', blogController.blog_index)" */

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

// / CREATE must be defined before ROUTER :id, Otherwise, path will be consider create as id.
module.exports = router;