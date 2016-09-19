"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Area = sequelize.define( "Area", {
    dbref: DataTypes.STRING
  }
  ,{
    classMethods: {
      associate: function( models ) {
        Area.belongsTo( models.Holding );
      }
    }
  });
  return Area;
};
