'use strict';
module.exports = (sequelize, DataTypes) => {
  const Karma = sequelize.define('Karma', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Karma.associate = function(models) {
    // associations can be defined here
    Karma.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Karma;
};
