const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

function render(notesToRender = notes) {
    notesList.textContent = "";

    notesToRender.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");

        if (note.category === "Personal") {
            listItem.classList.add("category-personal");
        } else if (note.category === "Work") {
            listItem.classList.add("category-work");
        } else if (note.category === "Study") {
            listItem.classList.add("category-study");
        }

        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("category-label");
        categoryLabel.textContent = note.category;

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const noteDate = document.createElement("small");
        noteDate.classList.add("note-date");
        noteDate.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter((item) => item.id !== note.id);
            render();
            updateCount();
        });

        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(noteDate);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    updateCount();
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
});