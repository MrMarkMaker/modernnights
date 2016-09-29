'use strict';

const Establishment = require( '../models' ).Establishment;
const Holding = require( '../models' ).Holding;
const Area = require( '../models' ).Area;
const errorHandler = require( '../lib/helpers.js' ).errorHandler;
const Claim = require( '../models' ).Claim;

module.exports = {

  getHoldings: function( req, res ) {
    console.log( "Mah dick.");
    Holding.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No holdings found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
  getEstablishments: function( req, res ) {
    Establishment.findAll({ include: [Holding] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No holdings found' );
        return null;
      }
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
   getEstablishment: function( req, res ){
    var id = parseInt( req.params.estid );
    Establishment.find({
      where: { id: id }, include: [Holding] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'Invalid establishment ID.' );
        return null;
      }      
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
  getAreas: function( req, res ) {
    Area.findAll({ include: [Holding] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No holdings found' );
        return null;
      }      
      res.json( data );
    })  
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
  getArea: function( req, res ) {
    var id = parseInt( req.params.id );
    Area.find({ where: { holding_id: id }, include: [Holding] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No area found' );
        return null;
      }      
      res.json( data );
    })  
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
  getEstablishmentsByArea: function( req, res ){
    var id = parseInt( req.params.areaid );
    Establishment.findAll({ where: {area_id: id}, include: [Holding] })
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No establishments found in this area.' );
        return null;
      }      
      res.json( data );
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },
  
  claimHolding: function(req,res){
    var holdid = parseInt( req.params.holdid );
    Claim.find({ where: {holding_id: holdid} })
    .then( function( data ){
      if( data != null){
        res.status( 400 ).send( 'A claim on this area already exists.' );
      } else {
        var playerid = 1; //fetch userID later pls
        Claim.create({ 
          holding_id: holdid
        //Add player ID.
        })
        .then( function( data ){
          if( data === null ){
            res.status( 500 ).send( 'Error creating claim' );
            return null;
          } else {
            res.status( 200 ).send( 'Success.' );
            return null;
          };
        })
      }
    })
  }
}