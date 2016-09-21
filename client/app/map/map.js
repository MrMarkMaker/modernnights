angular.module( 'modernnights.map', [] )
  .controller( 'MapController', function( $scope, Map ){
    $scope.areas = Map.getAreaData(); 
  })

