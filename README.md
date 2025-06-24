# 📝 Task Manager Web App

A simple, full-stack Task Management application built using **React.js**, **Node.js**, and **PostgreSQL/MySQL** (SQL edition of the MERN stack). Users can sign up, log in, and manage tasks with status tracking.

---

## 🚀 Features

* ✅ User Signup & Login (JWT Authentication)
* 🧾 Create, Read, Update Tasks
* 🔄 Task Status Flow: **To Do → In Progress → Done**
* 📊 Dashboard to view tasks grouped by status
* 🔒 Secure password hashing using bcrypt
* 📦 REST API backend with Express.js
* 💅 Responsive UI with TailwindCSS

---

## 🛠️ Tech Stack

| Frontend | Backend              | Database         | Auth         |
| -------- | -------------------- | ---------------- | ------------ |
| React.js | Node.js + Express.js | PostgreSQL/MySQL | JWT + Bcrypt |

---

## 📂 Project Structure

```
root/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │  
│   └── public/
└── README.md
```

---

## 📋 API Endpoints

### 🔐 Auth

* `POST /api/signup` - Register new user
* `POST /api/login` - Authenticate user & get token

### 📌 Tasks

* `GET /api/tasks` - Get all tasks for a user
* `POST /api/tasks` - Add a new task
* `PUT /api/tasks/:id` - Update task status or title

---

## 🧪 Database Tables

### `users`

| id | name | email | password |
| -- | ---- | ----- | -------- |

### `tasks`

\| id | title | status | user\_id | created\_at |

---

## 📷 Screenshots

> Include 2–3 screenshots or a screen recording of:

* Signup/Login
* Task Dashboard
* Status update flow

---

## 🧾 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Tasque.git
   cd Tasque
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   # Add your DB credentials and JWT secret to env
   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🧠 Bonus Features (Optional)

* 🗑️ Task deletion
* ✏️ Edit task title
* 🔍 Search / filter tasks

---

## ✅ Evaluation Criteria

* Functional app with working auth and CRUD
* Correct DB modeling (user-task relationship)
* Clean UI/UX
* Proper Git usage and commits

### Happy Coding...
