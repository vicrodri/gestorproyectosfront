
'use strict';
/**
 * @ngdoc function
 * @name frontApp.controller:RolCtrl
 * @description
 * # RolCtrl
 * Controlador de la parte "Gestion de Roles"
 */
angular.module('frontApp')
	.controller('RolCtrl', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher) {
		
	
		
		
/**Paginacion:
 *definimos los scopes de la vista para la paginacion
 * y la variable paginar
 */
 	
   $scope.roles = []
   $scope.currentPage = 1;
   $scope.numPerPage = 5;
 
		
   
  
   var paginar = function () {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			    var end = begin + $scope.numPerPage;
			    $scope.listaResultados = $scope.roles.slice(begin, end);
			    }
		  
   
   
/**
 * MUESTRA LISTADO
 * 
 */
    $scope.buscar={};
	$scope.listar=function(){
		console.log("listar roles");
		JSONRequestDispatcher.post('/api/rol/obtenerRoles',$scope.buscar)
		.then(function(res){
			
			$scope.roles = res.data;
			console.log($scope.roles);
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
 * BORRAR
 * 
 */
   $scope.confirmarBorrado=function(item){
		$scope.Rol=item;
		 $('#deleteDialog').modal();
	}
	$scope.borrarRol = function(){
		console.log("borrar");
		JSONRequestDispatcher.delete('/api/rol/eliminarRol',$scope.Rol)
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
		delete $scope.Rol;
	};

  


/**
 * DAR DE ALTA
 * 
 *  llamamos a la funcion submit del form, directiva ng-submit
 */
 
     $scope.alta=function(){
	
    	 JSONRequestDispatcher.post('/api/rol/crearRol',$scope.altaRoles)
		.then(function successCallback(response) {
			     
			$location.path("/roles/listado_roles/");
			console.log("ok");
		}
		,function errorCallback(response) {
			console.log("error");
	
		});
	};
	

/**
 * EDITAR
 * 
 */
	$scope.obtenerId=function(){
    var id=$routeParams.id;
    JSONRequestDispatcher.post('/api/rol/obtenerRoles',{'id':id})
	.then(function(res){
		$scope.editarRol=res.data[0];
		
	});
   
	};
	$scope.obtenerId();
     
	/*llamamos a la funcion submit del form, directiva ng-submit*/
	$scope.editRol=function(){
	console.log($scope.editarRol);
     
	JSONRequestDispatcher.put('/api/rol/actualizarRol', $scope.editarRol)
	.then(function successCallback(response) {
		$location.path("/roles/listado_roles/");
		
	});
};
    
});