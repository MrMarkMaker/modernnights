"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Holding = sequelize.define( "Holding", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
    wealth: DataTypes.INTEGER,
    reputation: DataTypes.INTEGER,
    manpower: DataTypes.INTEGER,
    level_modifier: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  });
  return Holding;
};
