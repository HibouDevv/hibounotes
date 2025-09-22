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

const md = window.markdownit({ html: true });
const editor = document.getElementById("editor");

editor.addEventListener("input", () => {
  const raw = editor.innerText;

  // Convert Markdown to HTML
  let html = md.render(raw);

  // Render math blocks
  html = html.replace(/\$\$(.*?)\$\$/gs, (_, math) => {
    try {
      return katex.renderToString(math, { displayMode: true });
    } catch {
      return `<code>${math}</code>`;
    }
  });

  html = html.replace(/\$(.*?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math, { displayMode: false });
    } catch {
      return `<code>${math}</code>`;
    }
  });

  editor.innerHTML = html;
  placeCaretAtEnd(editor);
});

// Slash commands
editor.addEventListener("keyup", (e) => {
  const text = editor.innerText;
  const match = text.match(/\/(\w+)$/);
  if (match) {
    const cmd = match[1];
    handleSlashCommand(cmd);
  }
});

function handleSlashCommand(cmd) {
  switch (cmd) {
    case "todo":
      insertBlock("- [ ] ");
      break;
    case "heading":
      insertBlock("# ");
      break;
    case "math":
      insertBlock("$$ equation $$");
      break;
    default:
      break;
  }
}

function insertBlock(text) {
  document.execCommand("insertText", false, text);
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
