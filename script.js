// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;

// ---------- 2. Load saved notes (or start empty) ----------
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- 3. Count message ----------
function getCountMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return `You have ${notes.length} notes.`;
}

// ---------- 4. Draw the notes on the page ----------
function render() {
  list.innerHTML = ""; // clear the old list (no user text here)

  // Search: every typed word must appear in the note (ignoring case)
  const words = searchInput.value.trim().toLowerCase().split(/\s+/);
  const visibleNotes = notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });

  if (visibleNotes.length === 0 && notes.length > 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  visibleNotes.forEach((note) => {
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
    del.addEventListener("click", () => deleteNote(note.id));

    meta.appendChild(label);
    meta.appendChild(date);
    body.appendChild(text);
    body.appendChild(meta);
    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });

  count.textContent = getCountMessage();
}

// ---------- 5. Add and delete (update data, save, render) ----------
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- 6. Listen for the form and the search box ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = ""; // valid note: clear any old error
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

searchInput.addEventListener("input", render);

clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// ---------- 7. Draw once when the page first loads ----------
render();
