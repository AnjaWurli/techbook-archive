let book;

function getData() {
  fetch("http://localhost:4730/books/" + window.location.search)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      book = data[0];
      renderInput();
      console.log(data[0]);
    });
}
getData();

function renderInput() {
  document
    .querySelector("header a")
    .setAttribute(
      "href",
      "http://localhost:5500/book-detail/index.html?id=" + book.id
    );

  document.querySelector("#title").value = book.title;
  document.querySelector("#subtitle").value = book.subtitle;
  document.querySelector("#isbn").value = book.isbn;
  document.querySelector("#abstract").value = book.abstract;
  document.querySelector("#author").value = book.author;
  document.querySelector("#publisher").value = book.publisher;
  document.querySelector("#price").value = book.price;
  document.querySelector("#numPages").value = book.numPages;
  document.querySelector("#cover").value = book.cover;
  document.querySelector("#userId").value = book.userId;
}

function getId() {
  let id = new URLSearchParams(window.location.search);
  return id.get("id");
}

document.body.addEventListener("submit", (event) => {
  event.preventDefault();
  const newEntry = {
    title: document.querySelector("#title").value,
    subtitle: document.querySelector("#subtitle").value,
    isbn: document.querySelector("#isbn").value,
    id: book.id,
    abstract: document.querySelector("#abstract").value,
    author: document.querySelector("#author").value,
    publisher: document.querySelector("#publisher").value,
    price: document.querySelector("#price").value,
    numPages: document.querySelector("#numPages").value,
    cover: document.querySelector("#cover").value,
    userId: document.querySelector("#userId").value,
  };

  try {
    for (let [key, value] of Object.entries(newEntry)) {
      if (value === "") {
        //check if one input not filled
        document
          .querySelector(`#${key}`)
          .style.setProperty("border-color", "red");
        throw new Error(key);
      }
    }
    fetch("http://localhost:4730/books/" + getId(), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));

    //go to next page after submitting
    window.location =
      "http://localhost:5500/book-detail/index.html?id=" + newEntry.id;
  } catch (e) {
    //if one input not filled
    document.querySelector("#error").innerText =
      "Please fill out: " + e.message;

    //remove error when typing
    document.querySelector(`#${e.message}`).addEventListener("keypress", () => {
      document
        .querySelector(`#${e.message}`)
        .style.removeProperty("border-color");
      document.querySelector("#error").innerText = "";
    });
  }
});
