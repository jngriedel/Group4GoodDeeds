'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deed = sequelize.define('Deed', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.NUMERIC
  }, {});
  Deed.associate = function(models) {
    // associations can be defined here
    Deed.hasMany(models.Review, {foreignKey: 'deedId'})
  };
  return Deed;
};
