"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Establishment = sequelize.define( "Establishment", {
    id_influence: DataTypes.INTEGER  
  }, {
    classMethods: {
      associate: function( models ) {
        Establishment.belongsTo( models.Holding );
        Establishment.belongsTo( models.Area );
      }
    }
  });

  return Establishment;
};
