import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Blog yazıları için basit bir veri yapısı
let blogPosts = [];
let postIdCounter = 0;

// Ana sayfa
app.get('/', (req, res) => {
  res.render('index', { blogPosts });
});

// Blog yazısı ekleme formu
app.get('/add', (req, res) => {
  res.render('add');
});

// Blog yazısı ekleme işlemi
app.post('/add', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: postIdCounter++, title, content };
  blogPosts.push(newPost);
  res.redirect('/');
});

// Blog yazısı görüntüleme
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts.find(post => post.id == postId);
  res.render('post', { post });
});

// Düzenleme sayfası
app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts.find(post => post.id == postId);
  res.render('edit', { post });
});

// Düzenleme işlemi
app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const post = blogPosts.find(post => post.id == postId);
  post.title = title;
  post.content = content;
  res.redirect('/');
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});