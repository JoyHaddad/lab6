const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;
  console.log(book);
  books.push(book);
  res.status(201).send("Book is added to database");
});

app.get("/", (req, res) => {
  res.sendFile("new-book.html", { root: __dirname + "/public" });
});

// app.get("/books", (req, res) => {
//   res.status(200).json(books);
// });

// app.put("/book/:isbn", (req, res) => {
//   const index = books.findIndex((book) => book.isbn === req.params.isbn);
//   if (index !== -1) {
//     books[index] = req.body;
//     res.send("Book updated");
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

// app.delete("/book/:isbn", (req, res) => {
//   const index = books.findIndex((book) => book.isbn === req.params.isbn);
//   if (index !== -1) {
//     books.splice(index, 1);
//     res.send("Book deleted");
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

app.listen(port, () => {
  console.log("Hello world app listening on port");
});