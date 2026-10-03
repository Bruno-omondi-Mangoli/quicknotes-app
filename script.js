// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// ---------- 2. Data ----------
let notes = [];

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.innerHTML = ""; // clear the old list (no user text here)

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note");
    li.classList.add(`category-${note.category}`);

    const body = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text; // safe for user text

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const label = document.createElement("span");
    label.classList.add("category-label");
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("delete-btn");

    meta.appendChild(label);
    meta.appendChild(date);
    body.appendChild(text);
    body.appendChild(meta);
    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- 4. Add a note ----------
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  render();
}

// ---------- 5. Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return; // temporary: proper validation comes in Task 4
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 6. Draw once when the page first loads ----------
render();
