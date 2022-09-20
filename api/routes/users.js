const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");

/** GET active user */
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = {
      firstName: req.currentUser.firstName,
      lastName: req.currentUser.lastName,
      emailAddress: req.currentUser.emailAddress,
    };
    await res.status(200).json(user);
  })
);

/** POST a new user */
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    await User.create({ firstName, lastName, emailAddress, password });
    res.location("/");
    res.status(201).end();
  })
);

module.exports = router;
