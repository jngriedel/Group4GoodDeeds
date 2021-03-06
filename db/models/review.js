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
    Review.belongsTo(models.Deed, {foreignKey: 'deedId'});
    Review.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Review;
};
