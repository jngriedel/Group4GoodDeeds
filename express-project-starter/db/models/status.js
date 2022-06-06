'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    currentStatus: DataTypes.STRING,
    deedId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};