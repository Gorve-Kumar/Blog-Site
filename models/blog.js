const mongoose = require('mongoose');

const Schema = mongoose.Schema; // define structures of our document.

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body:  {
        type: String,
        required: true,
    }
}, { timestamps: true }); // maintain automatically update and create times on database.

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;