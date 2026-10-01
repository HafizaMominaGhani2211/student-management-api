# 🎓 Student Management API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![REST API](https://img.shields.io/badge/REST-API-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

**A production-structured RESTful backend API for managing student records.**  
Built with Node.js and Express.js using clean MVC architecture.

*DecodeLabs Full Stack Development Internship — Batch 2026 | Project 2*

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Request & Response Examples](#-request--response-examples)
- [Validation Rules](#-validation-rules)
- [HTTP Status Codes Used](#-http-status-codes-used)
- [Testing with Postman](#-testing-with-postman)
- [Author](#-author)

---

## 📌 Overview

The **Student Management API** is a RESTful backend service that provides complete **CRUD** (Create, Read, Update, Delete) operations for student records. It is built without a database — data is stored in-memory using JavaScript arrays, which demonstrates pure server-side logic and API design principles.

### Key Highlights

- ✅ Full CRUD via REST conventions (GET, POST, PUT, DELETE)
- ✅ Input validation with descriptive, field-specific error messages
- ✅ Duplicate email detection and prevention
- ✅ Proper semantic HTTP status codes on every response
- ✅ Middleware-based validation layer (separated from business logic)
- ✅ Clean MVC-style folder structure
- ✅ Consistent JSON response format across all endpoints
- ✅ Global 404 and error handler for unmatched routes

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime — executes server-side code |
| **Express.js** | Web framework — handles routing and middleware |
| **JavaScript (ES6+)** | Application language |
| **In-Memory Array** | Temporary data storage (no database) |
| **Postman** | API testing and verification |
| **Nodemon** | Development utility — auto-restarts server on file changes |

---

## 📁 Project Structure

```
student-management-api/
│
├── server.js                    # Entry point — creates and starts the Express server
├── package.json                 # Project metadata and dependency declarations
├── .gitignore                   # Excludes node_modules and sensitive files from Git
├── README.md                    # Project documentation (this file)
│
├── data/
│   └── students.js              # In-memory data store — the "fake database" (array)
│
├── middleware/
│   └── validation.js            # Request validation — runs before controllers
│
├── routes/
│   └── studentRoutes.js         # URL route definitions — maps endpoints to controllers
│
└── controllers/
    └── studentController.js     # Business logic — handles each route's operation
```

### Architecture: How a Request Flows

```
Postman / Client
      │
      ▼
  server.js          ← Receives the request, applies global middleware
      │
      ▼
studentRoutes.js     ← Matches URL + HTTP method to the right handler
      │
      ▼
validation.js        ← Validates the request body (middleware)
      │
      ▼
studentController.js ← Executes business logic, reads/writes data
      │
      ▼
  data/students.js   ← In-memory array is read from or written to
      │
      ▼
  JSON Response      ← Sent back to the client with status code
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- **Node.js** (v16 or higher) — [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Postman** — [Download here](https://www.postman.com/downloads/)

Verify your installation:

```bash
node --version    # Should output v16.x.x or higher
npm --version     # Should output 8.x.x or higher
```

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/student-management-api.git

# 2. Navigate into the project folder
cd student-management-api

# 3. Install all dependencies
npm install

# 4. Start the development server (with auto-restart)
npm run dev

# OR — start without auto-restart
npm start
```

Once running, you will see:

```
================================================
  Student Management API is running!
  Server URL: http://localhost:3000
  Students Endpoint: http://localhost:3000/students
================================================
```

The API is now live at: **`http://localhost:3000`**

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/students` | Retrieve all students | None |
| `GET` | `/students/:id` | Retrieve a single student by ID | None |
| `POST` | `/students` | Add a new student | `name`, `email`, `course` |
| `PUT` | `/students/:id` | Update an existing student (partial allowed) | Any of: `name`, `email`, `course` |
| `DELETE` | `/students/:id` | Delete a student by ID | None |

### Student Object Schema

```json
{
  "id":     "number  — auto-assigned, unique identifier",
  "name":   "string  — full name of the student",
  "email":  "string  — valid email address (must be unique)",
  "course": "string  — course the student is enrolled in"
}
```

---

## 📋 Request & Response Examples

### 1. GET /students — Get All Students

**Request:**
```
GET http://localhost:3000/students
```

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 3,
  "message": "All students retrieved successfully.",
  "data": [
    {
      "id": 1,
      "name": "Ali Hassan",
      "email": "ali.hassan@example.com",
      "course": "Full Stack Development"
    },
    {
      "id": 2,
      "name": "Sara Khan",
      "email": "sara.khan@example.com",
      "course": "UI/UX Design"
    },
    {
      "id": 3,
      "name": "Umar Farooq",
      "email": "umar.farooq@example.com",
      "course": "Data Science"
    }
  ]
}
```

---

### 2. GET /students/:id — Get Student by ID

**Request:**
```
GET http://localhost:3000/students/1
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Student retrieved successfully.",
  "data": {
    "id": 1,
    "name": "Ali Hassan",
    "email": "ali.hassan@example.com",
    "course": "Full Stack Development"
  }
}
```

**Response `404 Not Found` (invalid ID):**
```json
{
  "success": false,
  "message": "Not Found: No student exists with ID 999."
}
```

---

### 3. POST /students — Add New Student

**Request:**
```
POST http://localhost:3000/students
Content-Type: application/json
```
```json
{
  "name": "Fatima Malik",
  "email": "fatima.malik@example.com",
  "course": "Cybersecurity"
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Student added successfully.",
  "data": {
    "id": 4,
    "name": "Fatima Malik",
    "email": "fatima.malik@example.com",
    "course": "Cybersecurity"
  }
}
```

---

### 4. PUT /students/:id — Update Student

Supports **partial updates** — send only the fields you want to change.

**Request:**
```
PUT http://localhost:3000/students/1
Content-Type: application/json
```
```json
{
  "course": "Advanced Full Stack Development"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Student with ID 1 updated successfully.",
  "data": {
    "id": 1,
    "name": "Ali Hassan",
    "email": "ali.hassan@example.com",
    "course": "Advanced Full Stack Development"
  }
}
```

---

### 5. DELETE /students/:id — Delete Student

**Request:**
```
DELETE http://localhost:3000/students/3
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Student 'Umar Farooq' with ID 3 deleted successfully.",
  "data": {
    "id": 3,
    "name": "Umar Farooq",
    "email": "umar.farooq@example.com",
    "course": "Data Science"
  }
}
```

---

## ✅ Validation Rules

All validation is handled in `middleware/validation.js` and runs before the controller executes.

| Field | Rule | Error Code |
|---|---|---|
| `name` | Required, cannot be empty or whitespace | `400` |
| `email` | Required, must match valid email format | `400` |
| `email` | Must be unique — no duplicate emails allowed | `409` |
| `course` | Required, cannot be empty or whitespace | `400` |
| `id` (URL param) | Must be a valid integer | `400` |

**Validation Error Examples:**

Missing field:
```json
{ "success": false, "message": "Validation Error: 'name' is required and cannot be empty." }
```

Invalid email format:
```json
{ "success": false, "message": "Validation Error: 'email' format is invalid. Example: user@example.com" }
```

Duplicate email:
```json
{ "success": false, "message": "Conflict: A student with email 'ali@example.com' already exists." }
```

---

## 🔢 HTTP Status Codes Used

| Code | Meaning | When returned |
|---|---|---|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST — new student added |
| `400` | Bad Request | Validation failed (missing/invalid fields) |
| `404` | Not Found | Student ID does not exist |
| `409` | Conflict | Duplicate email detected |
| `500` | Internal Server Error | Unexpected server crash |

---

## 🧪 Testing with Postman

1. Open Postman and click **New Collection**
2. Name it: `Student Management API`
3. Add one request per endpoint (use the examples above)
4. Set **Body → raw → JSON** for POST and PUT requests
5. Run requests in this order for a complete test flow:

```
GET  /students          → Confirm 3 default students exist
POST /students          → Add a new student (ID 4)
GET  /students/4        → Confirm new student was saved
PUT  /students/4        → Update the course
GET  /students/4        → Confirm update applied
DELETE /students/4      → Remove the student
GET  /students          → Confirm student is gone
GET  /students/999      → Confirm 404 for missing ID
POST /students (empty)  → Confirm 400 validation error
```

---

## 👤 Author

**[Your Name]**  
Full Stack Development Intern — DecodeLabs Batch 2026

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

---

<div align="center">

*Built as Project 2 of the DecodeLabs Industrial Training Kit.*  
*Project 1 was the skin. Project 2 is the life.*

</div>