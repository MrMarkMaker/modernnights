angular.module( 'modernnights.map', [] )
  
  .controller( 'MapController', function( $scope, Map ){
    
    $scope.context = null;
   
    $scope.areas = Map.getAreaData(); 
    $scope.context = '';
    Map.getAreaData()
    .then( function( areas ){
      $scope.areas = areas.data;
      
      $scope.pulseMarkers = [];
      areas.data.forEach( function( data ){
        
        var newmarker = {
          id: data.Holding.id,
          coords: {
            latitude: data.Holding.latitude,
            longitude: data.Holding.longitude
          },
          options: {
            labelClass:'mapmarkerlabel',
            labelAnchor:'0 0',
            labelContent: data.Holding.name 
          }
        }
        
        $scope.pulseMarkers.push( newmarker );
      })
      
      console.log( $scope.pulseMarkers );
    });
    
    $scope.map = {
      center: { latitude: 37.7749, longitude: -122.4194 }, 
      zoom: 12,
      options: {
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#746855"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#263c3f"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6b9a76"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#38414e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#212a37"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9ca5b3"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#746855"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#1f2835"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#f3d19c"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2f3948"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d59563"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#17263c"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#515c6d"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#17263c"
              }
            ]
          }
        ]
      }
    };
    
    
    
    $scope.showEstablishments = function( areaid ){
      $scope.context = "area";
      $scope.establishments = [];
      $scope.activeplace = null;
      Map.getArea( areaid )
      .then( function ( data ){
        $scope.activeplace = data;
      })
      
      Map.getEstablishmentsByArea( areaid )
      .then( function( data ){
        $scope.establishments = data;
      });
    }
    
    $scope.showEstablishment = function( estid ){
      $scope.context = "establishment";
      $scope.activeplace = [];
      Map.getEstablishment( estid )
      .then( function ( data ){
        $scope.activeplace = data;
      });
    }
    
    $scope.setContext = function( context ){
      $scope.context = context;
    }
    
    $scope.closeMap = function (){
      $scope.activeplace =[];
      $scope.context = null;
    }
    
    $scope.claimHolding = function( id ){
      $scope.claimmade = false;
      console.log( id );
      Map.claimHolding( id )
        .then( function ( data ){
          $scope.claimmade = true;
      });
    }
  })
  
  

