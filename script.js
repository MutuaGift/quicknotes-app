/* ============================================
   QuickNotes - application script
   ============================================ */

/* Select the elements we need */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

/* Every note is an object: id, text, category, createdAt */
let notes = [];

/* Build one note card. Uses createElement and textContent only, so note
   text is never treated as markup. */
function createNoteCard(note) {
  const item = document.createElement("li");
  item.className = "note-card category-" + note.category;

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;
  item.appendChild(text);

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const label = document.createElement("span");
  label.className = "category-label";
  label.textContent = note.category;
  meta.appendChild(label);

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;
  meta.appendChild(date);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.id = note.id;
  meta.appendChild(deleteBtn);

  item.appendChild(meta);
  return item;
}

/* Rebuild the whole list from the notes array */
function render() {
  notesList.replaceChildren();

  notes.forEach(function (note) {
    notesList.appendChild(createNoteCard(note));
  });

  updateCount();
}

/* Keep the count paragraph in step with the notes */
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

/* Work out the next free id */
function nextId() {
  return notes.reduce(function (max, note) {
    return Math.max(max, note.id);
  }, 0) + 1;
}

/* Add a note from the form, after validating the text */
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const rawText = noteInput.value;
  const text = rawText.trim();

  // an empty note, or one made only of spaces
  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // a note that is too long
  if (rawText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  notes.push({
    id: nextId(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  });

  noteInput.value = "";
  render();
});

/* Each Delete button removes its own note */
notesList.addEventListener("click", function (event) {
  const button = event.target.closest(".delete-btn");
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  notes = notes.filter(function (note) {
    return note.id !== id;
  });

  render();
});