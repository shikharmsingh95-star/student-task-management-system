
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(
    localStorage.getItem("studentTasks") || "[]"
);

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-message">No tasks yet. Add your first task!</p>';
        return;
    }

    tasks.forEach(function(task) {
        const card = document.createElement("div");
        card.className = "task-card";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description || "No description";

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due date: " + task.date;

        const status = document.createElement("select");

        ["To Do", "In Progress", "Testing", "Done"]
            .forEach(function(optionText) {
                const option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                option.selected = task.status === optionText;
                status.appendChild(option);
            });

        status.addEventListener("change", function() {
            task.status = status.value;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Task";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        card.append(title, description, dueDate, status, deleteButton);
        taskList.appendChild(card);
    });
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = {
        id: Date.now(),
        title: document.getElementById("taskTitle").value.trim(),
        description: document.getElementById("taskDescription").value.trim(),
        date: document.getElementById("taskDate").value,
        status: "To Do"
    };

    if (!task.title || !task.date) {
        alert("Please enter a task title and due date.");
        return;
    }

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

renderTasks();