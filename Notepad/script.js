document.getElementById("buton").addEventListener("click", () => addNote());
document.getElementById("text").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addNote();
  }
});

function addNote(text = null) {
  const note = text || document.getElementById("text").value;
  if (note === "") return;

  let category = document.querySelector('input[name="category"]:checked').value;
  let noteContainer = document.getElementById(category);

  let newNote = document.createElement("div");
  newNote.className = "note";
  newNote.innerText = note;

  newNote.addEventListener("click", function () {
    newNote.remove();
    saveToLocalStorage();
  });

  noteContainer.appendChild(newNote);
  document.getElementById("text").value = "";

  saveToLocalStorage();
}


let tabActive = document.querySelector("input[class='categories']:checked");



document.getElementById("delbuton").addEventListener("click", deleteAll);

function deleteAll() {
  ["General", "Daily", "important"].forEach(id => {
    const container = document.getElementById(id);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  });
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const notes = { General: [], Daily: [], immportant: [] };

  ["General", "Daily", "important"].forEach(id => {
    document.getElementById(id).querySelectorAll(".note").forEach(note => {
      notes[id].push(note.innerText);
    });
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("notes");
  if (!saved) return;

  const notes = JSON.parse(saved);
  ["General", "Daily", "important"].forEach(id => {
    notes[id].forEach(text => {
      let categoryRadio = document.querySelector(`input[value="${id}"]`);
      categoryRadio.checked = true;
      addNote(text);
    });
  });
}

loadFromLocalStorage();
