'use strict';
module.exports = (sequelize, DataTypes) => {
  const KarmasToDeed = sequelize.define('KarmasToDeed', {
    deedId: DataTypes.INTEGER,
    karmaId: DataTypes.INTEGER
  }, {});
  KarmasToDeed.associate = function(models) {
    // associations can be defined here
  };
  return KarmasToDeed;
};