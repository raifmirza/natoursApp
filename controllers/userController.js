const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowed.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  //Send Response
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: users.length,
    data: { users }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password update please use /updateMyPassword',
        400
      )
    );

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success'
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Not implemented' });
};
exports.createUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Not implemented' });
};
exports.updateUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Not implemented' });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Not implemented' });
};
