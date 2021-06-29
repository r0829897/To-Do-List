document.getElementById("add-task-button").addEventListener("click", addTask);

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// ELEMENTS
const inputTask = document.getElementById("input-task").valueOf(); // input field
const list = document.getElementById("task-list");  // task-list


window.onload = function load() {
    taskList.forEach(task => { list.innerHTML += "<li>" + task + "</li>" });
    refresh();
    list.querySelectorAll("input").forEach(input => input.addEventListener("change", crossOut));
}

function addTask() {
    const TASK = inputTask.value;

    if (TASK !== "") {
        list.innerHTML += "<li><input type=\"checkbox\"><span class=\"task\">" + TASK + "</span><button class=\"delete-btn\" onclick=\"remove(this)\">x</button></li>";
    }
    list.querySelectorAll("input").forEach(input => input.addEventListener("change", crossOut));
    list.valueOf().value = "";
    refresh();
}

function remove(object) {
    object.parentNode.remove();
}

function crossOut() {
    if (this.checked)
        this.parentNode.getElementsByClassName("task")[0].style.textDecoration = "line-through";
    else
        this.parentNode.getElementsByClassName("task")[0].style.textDecoration = "none";
}

window.onbeforeunload = function save() {
    taskList = [];
    let liArr = list.querySelectorAll("li");
    liArr.forEach(li => taskList.push(li.innerHTML))
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function refresh() {
    let liArr = list.querySelectorAll("li");
    for (let i = 0; i < liArr.length; i++) {
        liArr[i].querySelector("input").checked = liArr[i].innerHTML.includes("line-through");
    }
}