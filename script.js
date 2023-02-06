let state = { books: [], filter: [], wishlist: [] };
if (localStorage.getItem("wishlist")) {
  state.wishlist = JSON.parse(localStorage.getItem("wishlist"));
}

function getData() {
  //fetch("https://bookmonkey-api.jgreg.uber.space/books?_page=2&_limit=10")
  fetch("http://localhost:4730/books")
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
    const editLink = document.createElement("a");
    editLink.setAttribute(
      "href",
      "http://localhost:5500/edit/index.html?id=" + book.id
    );
    const editTxt = document.createTextNode("📝");
    editLink.append(editTxt);
    editBt.append(editLink);
    tdEdit.append(editBt);

    const tdSave = document.createElement("td");
    const saveBt = document.createElement("button");
    let saveText = document.createTextNode("💾");
    for (let wish of state.wishlist) {
      if (wish.isbn === book.isbn) {
        saveText = document.createTextNode("✅");
      }
    }
    tdSave.append(saveBt);
    saveBt.append(saveText);

    trEl.append(tdIsbn, tdTitle, tdDelete, tdEdit, tdSave);
  }
  document
    .querySelectorAll("button")
    .forEach((b) => b.addEventListener("click", buttons));
}

getData();

function buttons(e) {
  const isbn = e.target.parentElement.parentElement.classList.value;
  //delete Entry
  if (e.target.innerText === "❌") {
    fetch("http://localhost:4730/books/" + isbn, { method: "DELETE" })
      .then((res) => res.json())
      .then();
    getData();
  }
  //save
  for (let book of state.books) {
    if (book.isbn === isbn) {
      if (e.target.innerText === "💾") {
        state.wishlist.push(book);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        e.target.innerText = "✅";
      } else if (e.target.innerText === "✅") {
        for (let i = state.wishlist.length - 1; i >= 0; i--) {
          if (state.wishlist[i].isbn === isbn) {
            state.wishlist.splice(i, 1);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            e.target.innerText = "💾";
          }
        }
      }
    }
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
