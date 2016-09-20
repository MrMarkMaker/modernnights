'use strict';

const Establishment = require( '../models' ).Establishment;
const Holding = require( '../models' ).Holding;
const Area = require( '../models' ).Area;
const errorHandler = require( '../lib/helpers.js' ).errorHandler;

module.exports = {

  getHoldings: function( req, res ) {
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
    Establishment.findAll()
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
  
  getAreas: function( req, res ) {
    Area.findAll()
    .then( function( data ) {
      if( data.length === 0 ) {
        res.status( 404 ).send( 'No holdings found' );
        return null;
      }
      data.forEach( function( data ){
      })
      .then( function( data ){
        res.json( data );
      } )
      
    })
    .catch( function( err ) {
      errorHandler( err, req, res );
    });
  },

}