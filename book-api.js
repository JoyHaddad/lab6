const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises; // Change here to use fs.promises

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function loadBooks() {
  try {
    const data = await fs.readFile("./public/book.json", "utf8");
    books = JSON.parse(data).books;
    console.log("Books loaded successfully:", books);
  } catch (error) {
    console.error("Failed to read or parse books.json:", error);
  }
}

//add book
app.post("/book", (req, res) => {
  const book = req.body;
  console.log(book);
  books.push(book);
  res.status(201).send("Book is added to the database");
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.get("/view", (req, res) => {
  res.sendFile("book-list.html", { root: __dirname + "/public" });
});

app.get("/add", (req, res) => {
  res.sendFile("new-book.html", { root: __dirname + "/public" });
});

//get list of books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

//edit book
app.post("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  let found = false;
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.isbn === isbn) {
      books[i] = newBook;
      found = true;
      break;
    }
  }

  if (found) {
    res.send("Book is edited");
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

loadBooks().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
