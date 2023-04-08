let todoContainer = document.querySelector(".todo-container");
let cancelButton = document.querySelector(".cancel-button");
let sortButtons = document.querySelector(".sort-buttons");
let todoWrapper = document.querySelector(".todo-wrapper");
let todoInput = document.querySelector(".todo-input");
let todoItem = document.querySelector(".todo-item");
let clearButton = document.querySelector(".clear");
let colorize = document.querySelector("#colorize");
let sortToggle = true;
let arr = [];
window.onload = todoInput.focus();
new Sortable(todoWrapper, { animation: 250 });
colorize.addEventListener("click", setBackground);
sortButtons.addEventListener("click", sort);
document.addEventListener("keypress", (e) => {
    if (e.key.toLocaleLowerCase() === "c" && e.shiftKey) {
        e.preventDefault();
        setBackground();
    }
    if (e.key.toLocaleLowerCase() === "f" && e.shiftKey) {
        e.preventDefault();
        todoInput.focus();
    }
    if (e.key.toLocaleLowerCase() === "b" && e.shiftKey) {
        e.preventDefault();
        todoInput.blur();
    }
    if (e.key.toLocaleLowerCase() === "d" && e.shiftKey) {
        e.preventDefault();
        todoWrapper.innerHTML = "";
        todoWrapper.style.display = "none";
    }
    if (e.key.toLocaleLowerCase() === "s" && e.shiftKey) {
        e.preventDefault();
        sort();
    }
    if (e.key.toLocaleLowerCase() === "x" && e.shiftKey) {
        e.preventDefault();
        todoInput.value = "";
        todoInput.style.backgroundColor = "";
    }
});
function setBackground() {
    const bgColor = Math.floor(Math.random() * 10000000).toString(16);
    todoInput.style.backgroundColor = "#" + bgColor;
    backColor = todoInput.style.backgroundColor;
    todoInput.focus();
};
function todo() {
    todoWrapper.style = "height: 200px;";
    todoWrapper.style.display = "block";
    let newTodoItem = document.createElement("div");
    let newTodoInput = document.createElement("input");
    let newButton = document.createElement("button");
    let newImg = document.createElement("img");
    newTodoItem.classList.add("todo-item");
    newImg.src = "images/cancel-button.svg";
    newImg.addEventListener("mouseover", () => newImg.src = "images/cancel-button-hover.svg");
    newImg.addEventListener("mouseout", () => newImg.src = "images/cancel-button.svg");
    newButton.style.padding = "0";
    newButton.classList.add("cancel-button");
    newButton.style.left = "244px";
    newTodoInput.classList.add("todo-input", "font-effect-outline");
    newTodoItem.style.margin = "0";
    newTodoInput.style.margin = "0";
    newTodoInput.style.paddingLeft = "12px";
    newTodoInput.style.paddingRight = "50px";
    newTodoInput.style.borderRadius = "0";
    newTodoInput.style.border = `1px solid ${todoInput.style.backgroundColor}`;
    newTodoInput.value = todoInput.value;
    if (newTodoInput.value.trim() != "") {
        newTodoInput.classList.add("unique");
    }
    newTodoInput.style.backgroundColor = todoInput.style.backgroundColor;
    todoInput.value = "";
    todoInput.style.backgroundColor = "";
    newButton.appendChild(newImg);
    newTodoItem.appendChild(newTodoInput);
    if (todoWrapper.childElementCount > 4) {
        let elements = todoWrapper.getElementsByClassName("cancel-button");
        for (const item of elements) {
            item.style.left = "244px";
        };
    } else {
        newButton.style.left = "256px";
    }
    newTodoItem.appendChild(newButton);
    todoWrapper.appendChild(newTodoItem);
    newButton.addEventListener("mouseup", () => {
        newTodoItem.remove();
    });
};
function sort() {
    let elements = todoWrapper.querySelectorAll(".unique");
    if (sortToggle) {
        sortButtons.src = "images/sort-desc-button.svg";
        elements.forEach(item => arr.unshift(item.value));
        arr.sort((a, b) => b.localeCompare(a));
        arr.sort((a, b) => b - a);
        elements.forEach((item, index) => {
            item.value = arr[index];
        });
        arr = [];
        sortToggle = false;
    } else {
        sortButtons.src = "images/sort-asc-button.svg";
        elements.forEach(item => arr.unshift(item.value));
        arr.sort((a, b) => a.localeCompare(b));
        arr.sort((a, b) => a - b);
        elements.forEach((item, index) => {
            item.value = arr[index];
        });
        arr = [];
        sortToggle = true;
    }
};
clearButton.addEventListener("click", () => {
    todoWrapper.innerHTML = "";
    todoWrapper.style.display = "none";
});
cancelButton.addEventListener("click", (e) => {
    todoInput.value = "";
    todoInput.style.backgroundColor = "";
});
todoContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    todo();
});
