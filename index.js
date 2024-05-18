const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let books = []; // This will hold the book data

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.post("/book", (req, res) => {
  books.push(req.body);
  res.status(201).send("Book added");
});

app.put("/book/:isbn", (req, res) => {
  const index = books.findIndex((book) => book.isbn === req.params.isbn);
  if (index !== -1) {
    books[index] = req.body;
    res.send("Book updated");
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/book/:isbn", (req, res) => {
  const index = books.findIndex((book) => book.isbn === req.params.isbn);
  if (index !== -1) {
    books.splice(index, 1);
    res.send("Book deleted");
  } else {
    res.status(404).send("Book not found");
  }
});

// Additional routes for updating and deleting books will also be defined here

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
