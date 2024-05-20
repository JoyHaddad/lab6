async function loadBooks() {
  let response = await fetch("http://localhost:3000/books");
  console.log(response.status); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const books = JSON.parse(data);

    document.getElementById("books").innerHTML = "";

    for (let book of books) {
      const x = `
            <div class="border border-gray-200 p-4 rounded-md m-4 w-64">
              <h5 class="text-xl font-semibold">${book.title}</h5>
              <h6 class="text-lg mb-2 text-gray-400">${book.isbn}</h6>
              <div>Author: ${book.author}</div>
              <div>Publisher: ${book.publisher}</div>
              <div>Number Of Pages: ${book.numOfPages}</div>
              <hr class="my-4">
              <button type="button" class="p-2 bg-red-500 text-white rounded-md" onclick="deleteBook('${book.isbn}');">Delete</button>
              <button type="button" class="p-2 bg-blue-500 text-white rounded-md" data-toggle="modal"
                data-target="#editBookModal" onclick="setEditModal('${book.isbn}');">
                Edit
              </button>
            </div>
      `;
      document.getElementById("books").innerHTML += x;
    }
  }
}

loadBooks();

async function deleteBook(isbn) {
  const response = await fetch(`http://localhost:3000/book/${isbn}`, {
    method: "DELETE",
  });
  if (response.ok) {
    loadBooks();
  } else {
    console.log("Failed to delete the book.");
  }
}

async function setEditModal(isbn) {
  console.log(isbn);
  try {
    let response = await fetch(`http://localhost:3000/book/${isbn}`);
    if (response.status === 200) {
      let data = await response.text();
      const book = JSON.parse(data);

      const { title, author, publisher, publish_date, numOfPages } = book;

      document.getElementById("isbn").value = isbn;
      document.getElementById("title").value = title || "";
      document.getElementById("author").value = author || "";
      document.getElementById("publisher").value = publisher || "";
      document.getElementById("publish_date").value = publish_date || "";
      document.getElementById("numOfPages").value = numOfPages || "";

      document.getElementById(
        "editForm"
      ).action = `http://localhost:3000/book/${isbn}`;
    } else {
      console.error("Failed to fetch book details:", response.status);
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}
