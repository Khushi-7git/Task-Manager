const API = "http://127.0.0.1:8000/tasks/";

/* ── Stats ── */
function updateStats(tasks) {
  const total = tasks.length;
  const done  = tasks.filter(t => t.complete).length;
  const open  = total - done;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-open').textContent  = open;
  document.getElementById('stat-done').textContent  = done;
  document.getElementById('badge-count').textContent = total;
}

/* ── Render ── */
async function loadTasks() {
  const res   = await fetch(API);
  const tasks = await res.json();
  const list  = document.getElementById("taskList");
  updateStats(tasks);

  if (!tasks.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="emoji">📋</div>
        <strong>No tasks yet</strong>
        <span>Add your first task using the form above.</span>
      </div>`;
    return;
  }

  list.innerHTML = "";
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "card" + (task.complete ? " completed" : "");
    card.innerHTML = `
      <div class="card-id">Task #${task.id}</div>
      <h3>${task.title}</h3>
      <p>${task.description || "No description provided."}</p>
      <div class="status-chip ${task.complete ? 'done' : ''}">
        ${task.complete ? 'Completed' : 'In Progress'}
      </div>
      <div class="actions">
        <button class="btn-complete" onclick="markComplete(${task.id})" ${task.complete ? 'disabled style="opacity:.45;cursor:default"' : ''}>✔ Done</button>
        <button class="btn-edit"     onclick="updateTask(${task.id}, prompt('New title:', '${task.title}'), prompt('New description:', '${task.description || ''}'))">✏ Edit</button>
        <button class="btn-delete"   onclick="deleteTask(${task.id})">✕ Delete</button>
      </div>`;
    list.appendChild(card);
  });
}

/* ── Add ── */
async function addTask() {
  const id    = parseInt(document.getElementById("id").value);
  const title = document.getElementById("title").value.trim();
  const desc  = document.getElementById("desc").value.trim();

  if (!id || !title) { alert("Please enter an ID and title."); return; }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, description: desc, complete: false })
  });

  document.getElementById("id").value    = "";
  document.getElementById("title").value = "";
  document.getElementById("desc").value  = "";
  loadTasks();
}

/* ── Complete ── */
async function markComplete(id) {
  const res  = await fetch(API + id);
  const task = await res.json();
  task.complete = true;
  await fetch(API + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  loadTasks();
}

/* ── Delete ── */
async function deleteTask(id) {
  await fetch(API + id, { method: "DELETE" });
  loadTasks();
}

/* ── Update ── */
async function updateTask(id, newTitle, newDesc) {
  if (newTitle === null) return;          
  const res  = await fetch(API + id);
  const task = await res.json();
  task.title       = newTitle;
  task.description = newDesc;
  await fetch(API + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  loadTasks();
}

/* ── Init ── */
loadTasks();