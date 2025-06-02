function loadNotes(): string[] {
  const data = localStorage.getItem("notes");
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes: string[]): void {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(): void {
  const list = document.getElementById("noteList")!;
  list.innerHTML = "";
  const notes = loadNotes();
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;
    li.onclick = () => {
      notes.splice(index, 1);
      saveNotes(notes);
      renderNotes();
    };
    list.appendChild(li);
  });
}

(window as any).addNote = function () {
  const input = document.getElementById("noteInput") as HTMLInputElement;
  const note = input.value.trim();
  if (!note) return;
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
  input.value = "";
  renderNotes();
};

renderNotes();
