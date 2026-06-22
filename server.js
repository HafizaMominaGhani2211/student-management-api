const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const app = express();

// GLOBAL MIDDLEWARE
// These run on EVERY request before routes handle them

// express.json() parses incoming request bodies that are in JSON format.
// Without this, req.body would be undefined.
// When Postman sends { "name": "Ali" }, this middleware converts it
// from raw text into an actual JavaScript object.
app.use(express.json());

// express.urlencoded() parses form-encoded data (like from HTML forms)
// extended: false means use the simple built-in parser
app.use(express.urlencoded({ extended: false }));

// ROUTES
// All URLs starting with /students will be handled by studentRoutes
app.use("/students", studentRoutes);

// ROOT ROUTE
// When someone visits http://localhost:3000/ directly
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Student Management API",
    version: "1.0.0",
    developer: "DecodeLabs Internship — Batch 2026",
    endpoints: {
      getAllStudents: "GET    /students",
      getOneStudent:  "GET    /students/:id",
      addStudent:     "POST   /students",
      updateStudent:  "PUT    /students/:id",
      deleteStudent:  "DELETE /students/:id",
    },
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.method} ${req.originalUrl} does not exist on this server.`,
  });
});
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error. Something went wrong on the server.",
    error: err.message,
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("================================================");
  console.log(`  Student Management API is running!`);
  console.log(`  Server URL: http://localhost:${PORT}`);
  console.log(`  Students Endpoint: http://localhost:${PORT}/students`);
  console.log("================================================");
});