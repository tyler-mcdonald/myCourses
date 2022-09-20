/**
 * Wraps the provided callback function within an async function and try/catch block.
 * @param {function} cb - the callback function to be executed in the try statement
 */
exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        next(error);
      }
    }
  };
};
