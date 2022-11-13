const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

//starting express app
const app = express();

//conect to mongoDB
const dbURI =
  "mongodb+srv://Culic96:vindovs7@blogninja.hsz5ic3.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//register with engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "something 2",
//     body: "write something 2",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//single blog

// app.get("/single-blog", (req, res) => {
//   Blog.findById("636d07cb87455e6ae4e1e3ea")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//middleware and static files

// app.use((req, res, next) => {
//   console.log("new req made");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

app.get("/", (req, res) => {
  // res.send('<p>Home page</p>');  //automatically sets the HEADER!
  // const blogs = [
  //   { title: "Nikola", snippet: "lorem ipsum" },
  //   { title: "Rastko", snippet: "lorem ipsum" },
  //   { title: "Miljan", snippet: "lorem ipsum" },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

//in the next middleware

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

app.get("/about", (req, res) => {
  // res.send('<p>About page</p>');  //automatically sets the HEADER!
  res.render("about", { title: "About" });
});

//Blog routes
app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Eror Page" });
});
