module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Update a Tutorial with id
  router.put("/:id", courses.update);

  app.use('/api/courses', router);
};