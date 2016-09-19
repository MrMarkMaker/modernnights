"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Claim = sequelize.define( "Claim",
  {
    active: {
      type: DataTypes.ENUM( 'Y', 'N' ),
      defaultValue: 'Y'
    }
  },
  {
    classMethods: {
      associate: function( models ){
        Claim.belongsTo( models.Holding );
        Claim.belongsTo( models.Player );
        Claim.belongsTo( models.Stat );
      }
    }
  });
  return Claim;
};
