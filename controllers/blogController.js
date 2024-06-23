const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort( {createdAt: -1}) // descending
        .then((result) => {
            // our index.ejs expects some blogs
            res.render('blogs/index', {title: 'Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_details = (req, res) => {
    const id = req.params.id;
    console.log(id);

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: 'Blog Details'})
        })
        .catch((err) => {
            res.status(404).render('404', {title: 'Blog Not Found!!'});
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create Blog'});
};

const blog_create_post = (req, res) => {
    // Middleware: urlencoded required
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            console.log("Entry Deleted!!")
            // SEND BACK SOME JSON TO THE BROWSER
            // NOT REDIRECTING

            // WE GOT A AJAX REQUEST FROM THE SERVER, WE CAN'T USE REDIRECT AS A RESPONSE IN NODE.
            // WE HAVE TO REDIRECT FROM THE CLIENT SIDE.
            res.json({ redirect: '/blogs'});
        })
        .catch((err) => {
            console.log(err);
        })
};

module.exports = {
    blog_index, 
    blog_details, 
    blog_create_get, 
    blog_create_post, 
    blog_delete,
}