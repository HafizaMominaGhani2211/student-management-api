const { students } = require("../data/students");
// MIDDLEWARE 1: validateStudent
// Used for: POST /students (creating a new student)
// Checks: name, email, course are present + email format + no duplicate
const validateStudent = (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name' is required and cannot be empty.",
    });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'email' is required and cannot be empty.",
    });
  }

  if (!course || course.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'course' is required and cannot be empty.",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message:
        "Validation Error: 'email' format is invalid. Example: user@example.com",
    });
  }
  const emailExists = students.some(
    (student) => student.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    // 409 Conflict = the request conflicts with existing data
    return res.status(409).json({
      success: false,
      message: `Conflict: A student with email '${email}' already exists.`,
    });
  }
  next();
};

// MIDDLEWARE 2: validateStudentUpdate
// Used for: PUT /students/:id (updating existing student)
// Difference: email duplicate check must EXCLUDE the current student
const validateStudentUpdate = (req, res, next) => {
  const { name, email, course } = req.body;

  if (name !== undefined && name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name' cannot be an empty string.",
    });
  }

  if (email !== undefined) {
    if (email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'email' cannot be an empty string.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'email' format is invalid.",
      });
    }
    const currentStudentId = parseInt(req.params.id);

    const emailExists = students.some(
      (student) =>
        student.email.toLowerCase() === email.toLowerCase() &&
        student.id !== currentStudentId
    );

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: `Conflict: Another student already has the email '${email}'.`,
      });
    }
  }

  if (course !== undefined && course.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'course' cannot be an empty string.",
    });
  }

  next();
};

module.exports = { validateStudent, validateStudentUpdate };