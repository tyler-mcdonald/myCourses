const { Course } = require("../models");

/**
 * Verify that the authenticated user owns the course
 */
exports.verifyCourseOwner = async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  const method = req.method;
  let message;

  if (req.currentUser.id === course.userId) return next();
  else if (method === "PUT") {
    message = "Only the owner can update the course.";
  } else if (method === "DELETE") {
    message = "Only the owner can delete the course.";
  }
  res.status(403).json({ message });
};
