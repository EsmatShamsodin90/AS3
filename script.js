// Select form and notes list elements
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');
const titleColorInput = document.getElementById('titleColor');
const backgroundColorInput = document.getElementById('backgroundColor');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to display notes
function displayNotes() {
    notesList.innerHTML = ''; // Clear the notes list
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.backgroundColor; // Set background color
        noteElement.innerHTML = `
            <h3 style="color: ${note.titleColor}">${note.title}</h3> <!-- Set title color -->
            <p>${note.content}</p>
            <p class="note-date">${note.date}</p> <!-- Display date -->
            <input type="checkbox" ${note.completed ? 'checked' : ''} class="note-checkbox" data-index="${index}">
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        notesList.appendChild(noteElement);
    });
}

// Event listener for form submission
noteForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const newNote = {
        title: noteTitle.value,
        content: noteContent.value,
        completed: true, // Set the completed status to true by default
        titleColor: titleColorInput.value, // Get title color
        backgroundColor: backgroundColorInput.value, // Get background color
        date: new Date().toLocaleString() // Get the current date and time
    };
    notes.push(newNote); // Add the new note to the notes array
    localStorage.setItem('notes', JSON.stringify(notes)); // Save notes to localStorage
    displayNotes(); // Display the updated notes list
    noteTitle.value = ''; // Clear title input
    noteContent.value = ''; // Clear content input
});

// Event delegation for deleting notes and marking as completed
notesList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index'); // Get index of the note to delete
        notes.splice(index, 1); // Remove the note from the array
        localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
        displayNotes(); // Display the updated notes list
    }

    if (event.target.classList.contains('note-checkbox')) {
        const index = event.target.getAttribute('data-index'); // Get index of the note
        notes[index].completed = event.target.checked; // Update the completed status
        localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
    }
});

// Initial display of notes

// Select form elements
const fontSelect = document.getElementById('fontSelect');


