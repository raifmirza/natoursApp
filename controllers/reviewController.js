const AppError = require('../utils/appError');
const Review = require('./../models/reviewModel');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter;
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  if (!reviews) return next(new AppError('There are no reviews!', 404));

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: reviews.length,
    data: { reviews }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'Created',
    data: {
      newReview
    }
  });
});
