const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");
const { verifyCourseOwner } = require("../middleware/verify-owner");
const { verifyResource } = require("../middleware/verify-resource");
const { Course, User } = require("../models");

/** GET all courses */
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    });
    await res.status(200).json(courses);
  })
);

/** GET course by ID */
router.get(
  "/courses/:id",
  verifyResource,
  asyncHandler(async (req, res) => {
    res.status(200).json(req.course);
  })
);

/** POST a new course */
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const { title, description, estimatedTime, materialsNeeded, userId } =
      req.body;
    const course = await Course.create({
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    });
    res.location(`/courses/${course.id}`);
    res.status(201).end();
  })
);

/** PUT course */
router.put(
  "/courses/:id",
  verifyResource,
  authenticateUser,
  verifyCourseOwner,
  asyncHandler(async (req, res, next) => {
    const { title, description, estimatedTime, materialsNeeded } = req.body;
    await req.course.update({
      title,
      description,
      estimatedTime,
      materialsNeeded,
    });
    res.status(204).end();
  })
);

/** DELETE course */
router.delete(
  "/courses/:id",
  verifyResource,
  authenticateUser,
  verifyCourseOwner,
  asyncHandler(async (req, res) => {
    await req.course.destroy();
    res.status(204).end();
  })
);

module.exports = router;
