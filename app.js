const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes'); 
// const { reduce } = require('lodash');

// Express App
const app = express(); // invoke function

// Connect with MongoDB
const dbURI = 'mongodb+srv://Gorve:Jeswani01@blogsitecluster.3lvbvpn.mongodb.net/blogsDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => {
            console.log("Connected to DB");
            // Listen for Request
            app.listen(3000);
        })
        .catch((err) => {
            console.log("ERROR ENCOUNTERED!!!", err);
        })

// Register View Engine
app.set('view engine','ejs'); 
// app.set('views','viewsMy'); // VIEW BY DEFAULT, YOU CAN CHANGE TO ANY LIKE viewsMy

// Listen for Request
// app.listen(3000);

// MIDDLE WARE STATIC FILES
// (CSS, Images, that we want to make public)
app.use(express.static('public')); // public folder becomes available to the browser.
// It takes all the URL encoded data, passes it to the object that we can use on the request object so down here.
app.use(express.urlencoded({ extended: true})); // POST

/* // USE THIRD PARTY MODULE, MORGAN, FOR CONSOLE LOGGING.
app.use((req, res, next) => {
    console.log("New Request Made");
    console.log('Host: ', req.hostname);
    console.log('Path: ',req.path);
    console.log('Method: ', req.method);
    next(); // otherwise it keep handing
}); 
*/
app.use(morgan('tiny'));
// app.use(morgan('dev'));

/*
app.use((req, res, next) => {
    console.log("CONSOLING FROM THE NEXT MIDDLEWARE");
    next();
});
*/

/*  // Mongoose && Mongo Sandbox Routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({ title: "2003 Great Year", snippet: 'HI ME GORVE', body: 'MORE ABOUT MY NEW BLOG' });
    blog.save()
        .then((result) => { res.send(result); })
        .catch((err)   => { console.log(err); });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => { res.send(result); })
        .catch((err)   => { console.log(err); });
});

app.get('/single-blog', (req, res) => {
    Blog.findById("667454f9065ebf0750659f0d")
        .then((result) => { res.send(result); })
        .catch((err)   => { console.log(err); });
});
*/

app.get('/', (req, res) => {
    res.redirect('/blogs');
    // const blogs = [ {title: 'NEDUET', snippet: "lorem lorem lorem lorem lorem"}, ];
    // res.render('index', {title: 'Home', blogs: blogs});
});

/*
app.use((req, res, next) => {
    console.log("IT IS CONSOLED AFTER WE TAB TO SOME OTHER PAGE FROM HOME");
    next();
});
*/

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// BLOGS ROUTES IN DIFFERENT FILE
app.use('/blogs',blogRoutes);

// 404: ~PAGE NOT FOUND!
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error 404'});
});

// EJS - USED FOR DYNAMIC CONTENT