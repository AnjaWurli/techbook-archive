let wishlist = [];

function getWishlist() {
  if (localStorage.getItem("wishlist")) {
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
    render(wishlist);
  }
}

getWishlist();

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
    deleteBt.setAttribute("class", "remove");
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

    trEl.append(tdIsbn, tdTitle, tdDelete, tdEdit);
  }
  document.querySelectorAll(".remove").forEach((b) =>
    b.addEventListener("click", (e) => {
      const isbn = e.target.parentElement.parentElement.classList.value;
      for (let i = wishlist.length - 1; i >= 0; i--) {
        if (wishlist[i].isbn === isbn) {
          wishlist.splice(i, 1);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          getWishlist();
        }
      }
    })
  );
}
