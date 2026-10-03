# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and JavaScript. You can write short notes, give each one a category (Personal, Work or Study), search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add a note with a category (Personal, Work or Study)
- Each note shows its text, a category label, the date and time it was created, and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any note with its own Delete button
- Live search that is not case-sensitive, with a "No notes match your search." message
- A note count that is correct for zero, one and many notes
- Notes are saved with localStorage and loaded when the page opens
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

1. Clone the repository:
   `git clone https://github.com/Bruno-omondi-Mangoli/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server** (or simply double-click `index.html` to open it in your browser).

No installation or build step is needed.

## What I learned

- How to structure a page with semantic HTML (`header`, `main`, `section`, `footer`) and link every label to its input.
- How to lay out a form and note cards with Flexbox, and how a media query changes the layout on small screens.
- How the render pattern works: update the notes array, save it, then rebuild the list from the data with `createElement` and `textContent`.
- How to keep data after a refresh with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use `filter` to delete and search notes, and why user text must never go into `innerHTML`.
