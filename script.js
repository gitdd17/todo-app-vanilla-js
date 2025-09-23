const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");

window.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Set dark mode as default
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
});

addBtn.addEventListener("click", () => {
    addTask(taskInput.value.trim());
    taskInput.value = "";
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask(taskInput.value.trim());
        taskInput.value = "";
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

function addTask(taskText, completed = false) {
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.className = "task";
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = taskText;

    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
        updateCounts();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
        updateCounts();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
    updateCounts();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((t) => addTask(t.text, t.completed));
    updateCounts();
}

function updateCounts() {
    const tasks = document.querySelectorAll(".task");
    let completed = 0;
    let total = tasks.length;

    tasks.forEach((t) => {
        if (t.classList.contains("completed")) completed++;
    });

    completedCount.textContent = completed;
    remainingCount.textContent = total - completed;
}
