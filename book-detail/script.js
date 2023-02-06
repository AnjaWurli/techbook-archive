let book;

function getData() {
  fetch("http://localhost:4730/books/" + window.location.search)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      book = data[0];
      render();
      console.log(data[0]);
    });
}
getData();

function render() {
  const image = document.createElement("img");
  image.setAttribute("src", book.cover);

  const imageWrapper = document.createElement("div");
  imageWrapper.append(image);

  const section = document.createElement("section");
  const titleEl = document.createElement("h2");
  const title = document.createTextNode(book.title);
  titleEl.append(title);

  const subtitleEl = document.createElement("p");
  const subtitle = document.createTextNode(book.subtitle);
  subtitleEl.append(subtitle);

  const authorEl = document.createElement("p");
  const author = document.createTextNode("- " + book.author + " -");
  authorEl.append(author);

  const isbnEl = document.createElement("small");
  const isbn = document.createTextNode("ISBN " + book.isbn + " - ");
  const publisher = document.createTextNode(book.publisher);
  isbnEl.append(isbn, publisher);

  const priceEl = document.createElement("h3");
  const price = document.createTextNode(book.price);
  priceEl.append(price);

  const aboutEl = document.createElement("p");
  const about = document.createTextNode(book.abstract);
  aboutEl.append(about);

  const pagesEl = document.createElement("p");
  const pages = document.createTextNode(book.numPages + " Pages");
  pagesEl.append(pages);

  //const editEl = document.createElement("p");
  const editBt = document.createElement("button");
  const editTxt = document.createTextNode("📝");
  //editEl.append(editBt);
  editBt.append(editTxt);

  section.append(
    titleEl,
    subtitleEl,
    authorEl,
    isbnEl,
    priceEl,
    aboutEl,
    pagesEl,
    editBt
  );
  document.querySelector("main").append(imageWrapper, section);

  editBt.addEventListener("click", () => {
    window.location = "http://localhost:5500/edit/index.html?id=" + book.id;
  });
}
