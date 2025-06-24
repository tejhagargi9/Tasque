# 📝 Task Manager Web App

A simple task manager backend built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**. Users can register, log in, and manage tasks categorized by status (To Do, In Progress, Done).

---

## 🔗 Project Demo

🎥 [Watch the Project Video](https://drive.google.com/file/d/1XShM93iILXojKg-33B51XkQhARwd1xJF/view?usp=sharing)

---

## 📸 Screenshots

| Signup | login | Main Interface |
|--------|------------|
| ![Signup](./frontend/src/assets/signup.png) | ![Tasks](./frontend/src/assets/login.png) | ![MainInterface](./frontend/src/assets/mainInterface.png) |

---

## 🚀 Features

* 🔐 User Authentication (Signup & Login with JWT)
* 🧾 Task CRUD (Create, Read, Update, Delete)
* 📌 Tasks grouped by status
* 🔒 Passwords hashed with bcrypt
* 📦 Sequelize ORM with PostgreSQL (local)

---

## 📁 Project Structure

```
.
├── config/
│   └── db.js          # Sequelize DB connection
├── controllers/
│   └── userController.js
│   └── taskController.js
├── models/
│   └── user.js
│   └── task.js
├── routes/
│   └── userRoutes.js
│   └── taskRoutes.js
├── middleware/
│   └── auth.js
├── .env
├── index.js
├── package.json
└── README.md
```

---

## 🧑‍💻 Prerequisites

* Node.js installed
* PostgreSQL installed and running locally
* pgAdmin or any SQL GUI (optional)

---

## ⚙️ Environment Setup

1. Create a PostgreSQL database locally:

   * Example: `task_manager_db`

2. Create a `.env` file in the root folder:

```env
DB_NAME=task_manager_db
DB_USER=postgres
DB_PASS=your_postgres_admin_password
DB_HOST=localhost
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

3. Install dependencies:

```bash
npm install
```

4. Run the server:

```bash
nodemon
```

---

## 🧪 API Endpoints

### Auth Routes

* `POST /api/signup` – Register a new user
* `POST /api/login` – Log in and receive JWT

### Task Routes (Protected)

* `GET /api/tasks` – Get all tasks for logged-in user
* `POST /api/tasks` – Create a task
* `PATCH /api/tasks/:id` – Update task status/title
* `DELETE /api/tasks/:id` – Delete a task

> 🔐 Add `Authorization: Bearer <token>` header for protected routes.

---

## 🧼 Notes

* Uses Sequelize `sync()` to auto-create tables.
* Passwords are securely hashed using bcrypt.
* JWT used for protected routes and session validation.

---

