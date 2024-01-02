const tableContent = document.getElementById("tableContent");
const bookmarkNameInput = document.getElementById("bookmarkName");
const bookmarkURLInput = document.getElementById("bookmarkURL");
const submitBtn = document.getElementById("submitBtn");
const formBookmark = document.getElementById("form-bookmark");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

formBookmark.addEventListener("submit", function (e) {
  e.preventDefault();
  addItem();
});

// validation
function handleSiteName(input) {
  if (input.value.length > 3) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
  console.log(inputValue.length);
}

function handleSiteUrl(siteUrl) {
  if (isValidUrl(siteUrl.value)) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
  }
}

function renderBookmarks() {
  tableContent.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${bookmark.index}</td>
          <td>${bookmark.name}</td>
          <td>
            <a href="${bookmark.url}" target="_blank" class="btn btn-success">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
          </td>
          <td>
            <button class="btn btn-danger pe-2" onclick="handleDelete(${bookmark.index})">
              <i class="fa-solid fa-trash-can"></i>Delete
            </button>
          </td>
        `;
    tableContent.appendChild(row);
  });
  saveToLocalStorage();
}

submitBtn.addEventListener("click", addItem);

function addItem() {
  const name = bookmarkNameInput.value;
  const url = bookmarkURLInput.value;

  if (name.length > 3 && isValidUrl(url)) {
    bookmarks.push({
      index: bookmarks.length + 1,
      name: name,
      url: url,
    });

    renderBookmarks();

    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkURLInput.classList.add("is-invalid");
  }
}

window.handleDelete = function (index) {
  bookmarks = bookmarks.filter((bookmark) => bookmark.index !== index);
  renderBookmarks();
};

function saveToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

renderBookmarks();

function isValidUrl(str) {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}
