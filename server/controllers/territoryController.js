'use strict';

const Establishment = require( '../models' ).Establishment;
const Holding = require( '../models' ).Holding;
const Area = require( '../models' ).Area;
const errorHandler = require( '../lib/helpers.js' ).errorHandler;

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
    Area.find({ where: { id: id }, include: [Holding] })
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

}