async function loadBooks() {
  let response = await fetch("http://localhost:3000/books");
  console.log(response.status); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const books = JSON.parse(data);

    for (let book of books) {
      const x = `
                <div class="flex">
                    <div>
                        <div class="border border-gray-200 p-4 rounded-md">
                            <h5 class="text-xl font-semibold">${book.title}</h5>
                            <h6 class="text-lg mb-2 text-gray-400">${book.isbn}</h6>
                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${book.numOfPages}</div>
                            <hr class="my-4">
                            <button type="button" class="p-2 bg-red-500 text-white rounded-md">Delete</button>
                            <button type="button" class="p-2 bg-blue-500 text-white rounded-md" data-toggle="modal"
                                data-target="#editBookModal" onClick="setEditModal(${book.isbn});">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            `;
      document.getElementById("books").innerHTML += x;
    }
  }
}

loadBooks();
