const asyncHandler = require("express-async-handler");

// @desc  Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GetGoals" });
});

// @desc  Set goals
// @route POST /api/goals
// @access Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add a text");
  }

  res.status(200).json({ message: "Set Goal" });
});

// @desc  Update goals
// @route PUT /api/goals/:id
// @access Private

const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// @desc  Delete goals
// @route DELETE /api/goals
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoal,
};
