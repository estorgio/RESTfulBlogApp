var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', function (err) {
  if (err) {
    console.log('Unable to connect to the database.');
  }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://i.imgur.com/FJBbJgY.png',
//   body: 'Hello this is a blog post.'
// }, function (err, blog) {
//   if (err) console.log('Unable to create a new blog post.');
// });

// RESTFUL ROUTES
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('Error');
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

app.get('/', function (req, res) {
  res.redirect('/blogs');
});

app.get('*', function (req, res) {
  res.send('404 not found');
});

app.listen(3000, function () {
  console.log('App has been started on port 3000.');
});