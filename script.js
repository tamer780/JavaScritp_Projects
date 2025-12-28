const input = document.getElementById("input-box");
const addbtn = document.getElementById("add-task");
const listContainer = document.getElementById("list-container");

window.addEventListener("load", () => {
  input.focus();
});

function add() {
  if (input.value.trim() === "") {
    alert("You must enter something");
    return;
  }

  const li = document.createElement("li");
  li.className = "li-items";

  const spanText = document.createElement("span");
  spanText.className = "task-text";
  spanText.textContent = input.value;

  const editBtn = document.createElement("span");
  editBtn.className = "editbtn";
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("span");
  delBtn.className = "delbtn";
  delBtn.textContent = "X";

  li.appendChild(spanText);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  listContainer.appendChild(li);

  input.value = "";
  save();
}

// ADD
addbtn.addEventListener("click", add);

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    add();
  }
});

// Task
function editTask(li) {
  const taskText = li.querySelector(".task-text").textContent;

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = taskText;
  inputEdit.className = "edit-input";

  li.textContent = "";
  li.appendChild(inputEdit);

  const editBtn = document.createElement("span");
  editBtn.className = "editbtn";
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("span");
  delBtn.className = "delbtn";
  delBtn.textContent = "x";

  li.appendChild(editBtn);
  li.appendChild(delBtn);

  inputEdit.focus();

  // blur
  inputEdit.addEventListener("blur", () => {
    saveEditedTask(li, inputEdit.value);
  });

  // Enter
  inputEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEditedTask(li, inputEdit.value);
    }
  });
}

function saveEditedTask(li, value) {
  li.textContent = "";

  const spanText = document.createElement("span");
  spanText.className = "task-text";
  spanText.textContent = value;

  const editBtn = document.createElement("span");
  editBtn.className = "editbtn";
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("span");
  delBtn.className = "delbtn";
  delBtn.textContent = "X";

  li.appendChild(spanText);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  save();
}

// Event delegation for edit, delete, checked
listContainer.addEventListener("click", (e) => {
  const li = e.target.parentElement;

  if (e.target.classList.contains("editbtn")) {
    e.stopPropagation();
    editTask(li);
  } else if (e.target.classList.contains("delbtn")) {
    e.stopPropagation();
    li.remove();
    save();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    save();
  }
});

// dblclick
listContainer.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "LI") {
    editTask(e.target);
  }
});

// localStorage
function save() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// LocalStorage
function get() {
  const data = localStorage.getItem("data");
  if (data) listContainer.innerHTML = data;
}

get();
