const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");


// keep tasks after refresh the page
let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

// prevent the page to be refreshed
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});


// add, check and delete tasks
function toDoList(task) {
  let newTask = inputEl.value;

  //check if task exists
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li"); //create li element

 // check if task exists and it is checked and stays that way after refreshing the page
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl); //appears the li element
  inputEl.value = ""; // clear input after we enter
  const checkBtnEl = document.createElement("div"); // create checked button
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
  liEl.appendChild(checkBtnEl); // appears check icon
  const trashBtnEl = document.createElement("div"); // create trash button
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl); // appears trash icon

  // appears when the task is checked
  checkBtnEl.addEventListener("click", () => { 
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  //delete task
  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

// add local storage
function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];

  // add a function to each element so we triggered each function once for each element
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list)); //converts array to string : JSON.stringify
}