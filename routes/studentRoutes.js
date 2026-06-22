const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const {
  validateStudent,
  validateStudentUpdate,
} = require("../middleware/validation");
// ROUTE 1: GET /students
// No middleware needed — just return all students
router.get("/", getAllStudents);
// ROUTE 2: GET /students/:id
// :id is a URL parameter — it captures whatever comes after /students/
// Example: /students/3 → req.params.id = "3"
router.get("/:id", getStudentById);
// ROUTE 3: POST /students
// validateStudent runs FIRST (middleware)
// If it calls next(), then addStudent runs
// If it sends a response, addStudent never runs
router.post("/", validateStudent, addStudent);

// ROUTE 4: PUT /students/:id
// validateStudentUpdate runs first, then updateStudent
router.put("/:id", validateStudentUpdate, updateStudent);

// ROUTE 5: DELETE /students/:id
// No validation needed — just an ID in the URL
router.delete("/:id", deleteStudent);

// Export the router so server.js can use it
module.exports = router;