angular.module( 'modernnights.map', [] )
  
  .controller( 'MapController', function( $scope, Map ){
    
    $scope.context = null;
    $scope.map = {
      center: { latitude: 37.7749, longitude: -122.4194 }, 
      zoom: 12 
    };
    
    $scope.areas = Map.getAreaData(); 
    $scope.context = '';
    Map.getAreaData()
    .then( function( areas ){
      $scope.areas = areas.data;
    });
  
    $scope.showEstablishments = function( areaid ){
      $scope.context = "area";
      $scope.establishments = [];
      $scope.activeplace = [];
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
  
  

