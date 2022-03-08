const Course = require("../models/course.model.js");

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

	return;
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Title field field can not be empty!"
    });

	return;
  }

  if (!req.body.university) {
    res.status(400).send({
      message: "University field can not be empty!"
    });

	return;
  }

  // Create a Tutorial
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    university: req.body.university
  });

  // Save Tutorial in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Course.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    else res.send(data);
  });
};

// Find a single Course by Id
exports.findOne = (req, res) => {
  Course.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Course identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Course.updateById(
    req.params.id,
    new Course(req.body),
    (err, data) => {
      if (err) {
        switch (err.kind) {
			case "invalid":
			    res.status(412).send({
                    message: `Invalid Course data with id ${req.params.id}.`
                });
			break;
			case "not_found":
                res.status(404).send({
                    message: `Not found Course with id ${req.params.id}.`
                });
			break;
			default:
                res.status(500).send({
                    message: "Error updating Course with id " + req.params.id
                });
		}
      } else res.send(data);
    }
  );
};