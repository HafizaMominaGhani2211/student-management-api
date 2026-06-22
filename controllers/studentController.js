const data = require("../data/students");

// CONTROLLER 1: getAllStudents
// Route: GET /students
// Purpose: Return the entire students array
const getAllStudents = (req, res) => {
  return res.status(200).json({
    success: true,
    count: data.students.length, // How many students exist
    message: "All students retrieved successfully.",
    data: data.students, // The actual array of student objects
  });
};
// CONTROLLER 2: getStudentById
// Route: GET /students/:id
// Purpose: Find and return a single student by their ID
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: ID must be a valid number.",
    });
  }

  const student = data.students.find((s) => s.id === id);

  // If no student was found with that ID
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Not Found: No student exists with ID ${id}.`,
    });
  }

  // Student found — send it back
  return res.status(200).json({
    success: true,
    message: "Student retrieved successfully.",
    data: student,
  });
};
// CONTROLLER 3: addStudent
// Route: POST /students
// Purpose: Create a new student and add to the array
// Note: Validation middleware already ran before this function
const addStudent = (req, res) => {
  const { name, email, course } = req.body;

  // Build the new student object
  const newStudent = {
    id: data.nextId,       // Assign the current nextId value
    name: name.trim(),
    email: email.trim().toLowerCase(), // Store emails in lowercase consistently
    course: course.trim(),
  };

  // Push the new student into our array
  data.students.push(newStudent);
  data.nextId += 1;

  // 201 Created = the standard status for successful resource creation
  return res.status(201).json({
    success: true,
    message: "Student added successfully.",
    data: newStudent,
  });
};

// CONTROLLER 4: updateStudent
// Route: PUT /students/:id
// Purpose: Update one or more fields of an existing student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: ID must be a valid number.",
    });
  }
  const studentIndex = data.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Not Found: No student exists with ID ${id}.`,
    });
  }
  const existingStudent = data.students[studentIndex];
  const updatedStudent = {
    ...existingStudent,           // Keep all original fields
    name: req.body.name !== undefined
      ? req.body.name.trim()
      : existingStudent.name,
    email: req.body.email !== undefined
      ? req.body.email.trim().toLowerCase()
      : existingStudent.email,
    course: req.body.course !== undefined
      ? req.body.course.trim()
      : existingStudent.course,
  };

  // Replace the student at that index with the updated version
  data.students[studentIndex] = updatedStudent;

  return res.status(200).json({
    success: true,
    message: `Student with ID ${id} updated successfully.`,
    data: updatedStudent,
  });
};
// CONTROLLER 5: deleteStudent
// Route: DELETE /students/:id
// Purpose: Remove a student from the array permanently
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: ID must be a valid number.",
    });
  }

  const studentIndex = data.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Not Found: No student exists with ID ${id}.`,
    });
  }
  const deletedStudent = data.students[studentIndex];

  data.students.splice(studentIndex, 1);

  return res.status(200).json({
    success: true,
    message: `Student '${deletedStudent.name}' with ID ${id} deleted successfully.`,
    data: deletedStudent,
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};