# QuickNotes

QuickNotes is a small, fast note-taking web app built with plain HTML, CSS and
vanilla JavaScript — no frameworks and no build step. You type a note, give it a
category, and it is saved to your browser straight away, so your notes are still
there after you close the tab or refresh the page. It was built as Project 1 for
the Web Foundations course, growing out of the Day 4 lab.

## Features

- **Add notes** with a category of Personal, Work or Study
- **Three category styles** — each category gets its own colour and left border
- **Delete** a single note, or **clear everything** behind a confirmation prompt
- **Live search** as you type, ignoring case, matching all words you typed
- **Input validation** with clear messages for empty notes and notes over 200 characters
- **Live note count** that reads correctly for zero, one and many notes
- **Saves automatically** to `localStorage`, so notes survive a refresh
- **Keyboard and screen-reader friendly** labels on every control
- **Responsive layout** that adapts down to phone screens

## How to run it locally

The app is made of four static files in the root of this repository, so any
static web server will do. Using the VS Code Live Server extension:

1. Open the folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

It will open at something like `http://127.0.0.1:5500/index.html`.

Any other static server works just as well:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

You can also just open `index.html` directly in your browser. The app will work,
but note that some browsers restrict `localStorage` on `file://` URLs, so notes
may not persist. Serving over `http://localhost` avoids that.

## Project layout

```
index.html   page structure
style.css    all styling, including the responsive rules
script.js    add, delete, search, validation and storage
README.md    this file
```

## What I learned

- **Building the DOM safely.** Every note card is assembled with
  `document.createElement()` and filled using `textContent`, never `innerHTML`.
  This means a note containing `<script>alert(1)</script>` is displayed as plain
  text instead of being executed, so user input can never become markup.

- **Why the note count reports all notes, not just the filtered ones.** While
  searching, the list shows a subset of notes, but `#note-count` always reflects
  every note you have. This keeps "You have no notes yet." honest — otherwise
  searching a non-empty list for something that does not exist would claim you
  have no notes at all.

- **Event delegation beats per-button listeners.** Instead of attaching a click
  handler to every Delete button as it is created, I listen once on
  `#notes-list` and use `event.target.closest('.delete-btn')` to find the button.
  Re-rendering the list then needs no extra wiring.

- **CSS specificity is not obvious.** During the Day 4 lab I styled a counter
  with `#char-count { color: ... }`, and my `.warning` class had no effect
  because an ID selector (1-0-0) always beats a class selector (0-1-0). Changing
  the base rule to an element selector fixed it. A rule can exist in your
  stylesheet and still do nothing.

- **Small commits make the history readable.** Building this in six steps —
  structure, styling, add, validation, storage and search, then the README —
  meant each commit does one thing. `git log --oneline` tells the story of how
  the app was built.

- **`localStorage` only stores strings.** Storing an array of objects needs
  `JSON.stringify()` on the way in and `JSON.parse()` on the way out. Wrapping
  the parse in `try/catch` also protects the app from corrupted saved data.