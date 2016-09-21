angular.module( 'modernnights.map', [] )
  .controller( 'MapController', function( $scope, Map ){
    $scope.areas = Map.getAreaData(); 
    $scope.context = '';
    Map.getAreaData()
    .then( function( data ){
      $scope.areas = data;
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
  })

