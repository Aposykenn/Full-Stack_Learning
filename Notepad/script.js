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
  newNote.className = `note ${category}`;
  newNote.innerText = note;
  

  let newNoteC = document.createElement("button");
  newNoteC.className = "dots";

  const imgg = document.createElement("img");
  imgg.className = "dots";
  imgg.src = "images/3.svg";
  newNoteC.appendChild(imgg);
  newNote.appendChild(newNoteC);

  newNoteC.addEventListener("click", function () {
    let edit = document.createElement("textarea")
    newNote.appendChild(edit)
    edit.value = newNote.innerText
    edit.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        newNote.innerText = edit.value
        edit.remove()
        saveToLocalStorage();
      }
    })
  });

  let newNoteD = document.createElement("button");
  newNoteD.className = "bin";

  const imgd = document.createElement("img");
  imgd.className = "bin";
  imgd.src = "images/bin.svg";
  newNoteD.appendChild(imgd);
  newNote.appendChild(newNoteD);

  newNoteD.addEventListener("click", function () {
    newNote.remove();
    saveToLocalStorage();
  });

  noteContainer.appendChild(newNote);
  document.getElementById("text").value = "";

  saveToLocalStorage();
}

const categoryButtons = document.querySelectorAll("button[data-category]");
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    const notes = document.querySelectorAll(".note");

    notes.forEach(note => {
      if (note.classList.contains(category)) {
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
    });
  });
});


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
  const notes = { General: [], Daily: [], important: [] };

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
