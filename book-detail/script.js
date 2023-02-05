let book;

function getData() {
  //fetch("https://bookmonkey-api.jgreg.uber.space/books?_page=2&_limit=10")
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
  const pages = document.createTextNode(book.numPages + "Pages");
  pagesEl.append(pages);

  section.append(
    titleEl,
    subtitleEl,
    authorEl,
    isbnEl,
    priceEl,
    aboutEl,
    pagesEl
  );
  document.querySelector("main").append(imageWrapper, section);
}
