document.getElementById("buton").addEventListener("click", addNote);
document.getElementById("text").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addNote();
  }
});
function addNote(text = null) {
    const note = text || document.getElementById("text").value;
    if (note === "") {
        return;
    }
    let noteContainer = document.getElementById("noteContainer");
    let newNote = document.createElement("div");
    newNote.className = "note";
    newNote.textContent = text;
    newNote.innerText = note;
    noteContainer.appendChild(newNote);
    document.getElementById("text").value = "";
    newNote.addEventListener("click", function () { 
        newNote.remove();
        saveToLocalStorage();
    } ); 
    

    saveToLocalStorage();
}


document.getElementById("delbuton").addEventListener("click", deleteAll);
function deleteAll() {
    let noteContainer = document.getElementById("noteContainer");
    while (noteContainer.firstChild) {
        noteContainer.removeChild(noteContainer.firstChild);
    }
    saveToLocalStorage();
}


function saveToLocalStorage() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
        notes.push(note.innerText);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}


function loadFromLocalStorage() {
    const saved = localStorage.getItem("notes");
    if (!saved) return;
    const notes = JSON.parse(saved);
    notes.forEach(text => {
        addNote(text);
    });
}

loadFromLocalStorage();