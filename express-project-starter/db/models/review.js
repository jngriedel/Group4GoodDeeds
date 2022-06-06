'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    rating: DataTypes.NUMERIC,
    userId: DataTypes.INTEGER,
    deedId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};