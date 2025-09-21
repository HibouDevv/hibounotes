function saveNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value.trim();
  if (!noteText) return;

  const noteList = document.getElementById("noteList");
  const noteItem = document.createElement("li");
  noteItem.className = "bg-gray-700 p-2 rounded text-sm";
  noteItem.innerText = noteText;

  noteList.prepend(noteItem);
  input.value = "";
}

let currentFolder = 'General';

function selectFolder(folder) {
  currentFolder = folder;
  renderNotes();
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}