const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.title = course.title;
  this.description = course.description;
  this.university = course.university;
};

Course.create = (newCourse, result) => {
	if (!newCourse) {
		result({ kind: "invalid" }, null);
        return;
	}
	if (!newCourse.title) {
		result({ kind: "invalid" }, null);
        return;
	}
	if (!newCourse.university) {
		result({ kind: "invalid" }, null);
        return;
	}
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.getAll = (title, result) => {
  let query = "SELECT * FROM courses";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.updateById = (id, course, result) => {

	if (!course) {
		result({ kind: "invalid" }, null);
        return;
	}
	if (!course.title) {
		result({ kind: "invalid" }, null);
        return;
	}
	if (!course.university) {
		result({ kind: "invalid" }, null);
        return;
	}
  sql.query(
    "UPDATE courses SET title = ?, description = ?, university = ? WHERE id = ?",
    [course.title, course.description, course.university, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query("DELETE FROM courses WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", id);
    result(null, res);
  });
};

module.exports = Course;