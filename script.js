let state = { books: [], filter: [] };

function getData() {
  //fetch("https://bookmonkey-api.jgreg.uber.space/books?_page=2&_limit=10")
  fetch("http://localhost:4730/books") //?_page=2&_limit=10
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.books = data;
      render(state.books);
      console.log(state.books);
    });
}

function render(list) {
  document.querySelector("tbody").innerHTML = "";
  for (let book of list) {
    const trEl = document.createElement("tr");
    trEl.classList.add(book.id);
    document.querySelector("tbody").append(trEl);

    const tdIsbn = document.createElement("td");
    const isbn = document.createTextNode(book.isbn);
    tdIsbn.append(isbn);

    const tdTitle = document.createElement("td");
    const titleLink = document.createElement("a");
    const titleTxt = document.createTextNode(book.title);
    titleLink.setAttribute(
      "href",
      "http://localhost:5500/book-detail/index.html?id=" + book.id
    );
    titleLink.append(titleTxt);
    tdTitle.append(titleLink);

    const tdDelete = document.createElement("td");
    const deleteBt = document.createElement("button");
    const deleteTxt = document.createTextNode("❌");
    tdDelete.append(deleteBt);
    deleteBt.append(deleteTxt);

    const tdEdit = document.createElement("td");
    const editBt = document.createElement("button");
    const editTxt = document.createTextNode("📝");
    tdEdit.append(editBt);
    editBt.append(editTxt);

    const tdSave = document.createElement("td");
    const saveBt = document.createElement("button");
    const saveText = document.createTextNode("💾");
    tdSave.append(saveBt);
    saveBt.append(saveText);

    trEl.append(tdIsbn, tdTitle, tdDelete, tdEdit, tdSave);
  }
  document
    .querySelectorAll("button")
    .forEach((b) => b.addEventListener("click", deleteEntry));
}

getData();

//delete Entry
function deleteEntry(e) {
  if (e.target.innerText === "❌") {
    const isbn = e.target.parentElement.parentElement.classList.value;
    fetch("http://localhost:4730/books/" + isbn, { method: "DELETE" })
      .then((res) => res.json())
      .then();
    getData();
  }
}

//filter Entries
document.body.addEventListener("submit", filterEntry);

function filterEntry(e) {
  e.preventDefault();
  const search = document.querySelector("#search").value;
  fetch("http://localhost:4730/books?q=" + search)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.filter = data;
      render(state.filter);
    });
}
