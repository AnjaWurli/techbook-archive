document.body.addEventListener("submit", (event) => {
  event.preventDefault();

  const newEntry = {
    title: document.querySelector("#title").value,
    subtitle: document.querySelector("#subtitle").value,
    isbn: document.querySelector("#isbn").value,
    id: document.querySelector("#isbn").value,
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
    fetch("http://localhost:4730/books", {
      method: "POST",
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
