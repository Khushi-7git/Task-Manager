# 📝 Task Manager

A simple full-stack task management app built with a **FastAPI** backend and **HTML/CSS/JS** frontend.

<img width="1918" height="960" alt="image" src="https://github.com/user-attachments/assets/afe36d22-9d95-40ea-b820-a7a2724289a8" />
---

## Project Structure

```
project/
├── main.py        # FastAPI backend
├── index.html     # Frontend markup
├── style.css      # Styles
└── app.js         # Frontend logic (API calls)
```

---

## Backend Setup

### Requirements

- Python 3.8+
- FastAPI
- Uvicorn

### Install Dependencies

```bash
pip install fastapi uvicorn
```

### Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

---

## Frontend Setup

No build step needed. Just open `index.html` in your browser — but make sure the backend server is running first, otherwise API calls will fail.

> **Tip:** Use a local server extension (e.g. VS Code Live Server) or simply open the file directly in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks/` | Get all tasks |
| `POST` | `/tasks/` | Create a new task |
| `GET` | `/tasks/{id}` | Get a task by ID |
| `PUT` | `/tasks/{id}` | Update a task by ID |
| `DELETE` | `/tasks/{id}` | Delete a task by ID |

### Task Schema

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "complete": false
}
```

- `id` — integer, required
- `title` — string, required
- `description` — string, optional (default `null`)
- `complete` — boolean, optional (default `false`)

---

## Features

- **Add** a task with an ID, title, and optional description
- **View** all tasks in a responsive card grid
- **Complete** a task (marks it with a green style and strikethrough)
- **Edit** a task's title and description via a prompt dialog
- **Delete** a task
- **Live stats** — total, open, and completed task counts in the header

---

## Notes

- Task data is stored **in memory** — it resets every time the server restarts. To persist data, replace `task_db = []` with a database (e.g. SQLite via SQLAlchemy).
- The backend uses CORS middleware set to `allow_origins=["*"]`, which is fine for local development but should be restricted in production.
- Task IDs are manually assigned — make sure each task has a unique ID when adding.
