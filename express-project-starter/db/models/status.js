'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    currentStatus: DataTypes.STRING,
    deedId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
    Status.belongsTo(models.Deed, {foreignKey: 'deedId'});
    Status.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Status;
};
