
'use strict';
/**
 * @ngdoc function
 * @name frontApp.controller:EntregasCtrl
 * @description
 * # EntregasCtrl
 * Controlador de la parte "Gestion de Entregas"
 */
angular.module('frontApp')
	.controller('EntregasCtrl', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher) {
		
	
		
		
/**Paginacion:
 *definimos los scopes de la vista para la paginacion
 * y la variable paginar
 */
 	
   $scope.entregas = []
   $scope.currentPage = 1;
   $scope.numPerPage = 5;
   $scope.altaEntregas={};
		
   
  
   var paginar = function () {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			    var end = begin + $scope.numPerPage;
			    $scope.listaResultados = $scope.entregas.slice(begin, end);
			    }
		  
   
   
/**
 * MUESTRA LISTADO
 * 
 */
    $scope.buscar={};
	$scope.listar=function(){
		console.log("listar entregas");
		JSONRequestDispatcher.post('/api/entregas/obtenerAllEntregas',$scope.buscar)
		.then(function(res){
			
			$scope.entregas = res.data;
			console.log("todo");
			console.log($scope.entregas);
			paginar();
		});
	};
	
	/*habría que volver a listar aqui,*$scope.listar(), pero no hace falta porque estamos usando la directiva 
	 * ng-init en el formulario de inicio
	 */
	
	/*llamamos a la paginacion para motrar los datos */
       $scope.$watch('currentPage + numPerPage', function() {
		    paginar();
		});	

       
       /**
        * EDITAR
        * 
        */
       	$scope.obtenerId=function(){
       		var id=$routeParams.id;
       		JSONRequestDispatcher.post('/api/entregas/obtenerEntrega',{'idEntrega':id})
        	.then(function(res){
        		$scope.editEntrega=res.data[0];
        		console.log($scope.editEntrega);
        	});
       	};
       	$scope.obtenerId();
            
       	/*llamamos a la funcion submit del form, directiva ng-submit*/
       	$scope.editarEntrega=function(){
       	console.log($scope.editEntrega);
            
       	JSONRequestDispatcher.put('/api/entregas/updateEntrega', $scope.editEntrega)
       	.then(function successCallback(response) {
       		$location.path("/entregas/");
       		
       	});
       };
       
       
       
       /**
        * BORRAR
        * 
        */
          $scope.confirmarBorrado=function(item){
       		$scope.Entrega=item;
       		 $('#deleteDialog').modal();
       	}
       	$scope.borrarEntrega = function(){
       		console.log("borrar");
       		JSONRequestDispatcher.delete('/api/entregas/borrarEntrega',$scope.Entrega)
       		.then(function successCallback(response) {
       			             $('#successDialog').modal();
       			              console.log(response.data);
               /*refresca los datos para comprobar si se efectuo el borrado*/	
       		$scope.listar();
       		}
       		,function errorCallback(response){
       			$("#errorDialog").modal();
       			/*habria que volver a listar si no se usara la directiva*/
       		});
       		$('#deleteDialog').modal('hide');
       		delete $scope.Entrega;
       	};
  
       

       	/**
       	 * DAR DE ALTA
       	 * 
       	 *  llamamos a la funcion submit del form, directiva ng-submit
       	 */
      
       	 $scope.alta=function(){
       		 console.log("Entro en alta");
       		console.log($scope.altaEntregas);
       	         JSONRequestDispatcher.post('/api/entregas/anadirEntregas',$scope.altaEntregas)
       			.then(function successCallback(response) {
       				     console.log("bien");
       				$location.path("/entregas/");
       				$scope.listar();
       				console.log($scope.altaEntregas);
       			}
       			,function errorCallback(response) {
       				console.log("error");
       		
       			});
       		};
       		

    
});