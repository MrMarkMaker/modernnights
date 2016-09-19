"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Mapsquare = sequelize.define( "Mapsquare", {
    
  }, {
    classMethods: {
      associate: function( models ) {
        Mapsquare.belongsTo( models.Holding );
        Mapsquare.belongsTo( models.Mapsquare );
      }
    }
  });

  return Mapsquare;
};
