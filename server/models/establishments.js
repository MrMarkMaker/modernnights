"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Establishment = sequelize.define( "Establishment", {
    
  }, {
    classMethods: {
      associate: function( models ) {
        Establishment.belongsTo( models.Holding );
        Establishment.belongsTo( models.Mapsquare );
      }
    }
  });

  return Establishment;
};
