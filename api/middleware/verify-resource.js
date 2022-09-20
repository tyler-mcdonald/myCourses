const { Course, User } = require("../models");

/**
 * Verify that the requested route contains a resource. If a resource exists, add it to the request body at `req.body.course`.
 */
exports.verifyResource = async (req, res, next) => {
  const id = await req.params.id;
  const course = await Course.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: User,
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    },
  });
  if (course) {
    req.course = course;
    return next();
  } else {
    res.status(404).json({ message: "The requested resource does not exist" });
  }
};
