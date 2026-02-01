function addTask() {
    const input = document.getElementById('todo-input');
    const container = document.getElementById('todo-list');
    const taskText = input.value.trim();

    if (!taskText) return;

    createTaskElement(taskText, container);
    input.value = '';
}

function createTaskElement(text, container) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text" onclick="toggleComplete(this)">${text}</span>
        <div class="actions">
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="deleteTask(this)">🗑️</button>
        </div>
    `;
    container.appendChild(li);
}

function toggleComplete(span) {
    span.classList.toggle('completed');
}

function deleteTask(btn) {
    btn.closest('li').remove();
}

function editTask(btn) {
    const li = btn.closest('li');
    const span = li.querySelector('.task-text');
    const currentText = span.innerText;

    const newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
        span.innerText = newText.trim();
    }
}
