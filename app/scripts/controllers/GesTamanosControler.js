'use strict';

angular.module('frontApp')
.controller('TamCtrl', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher) {

   $scope.tamanos=[];
   $scope.currentPage = 1;
   $scope.numPerPage = 5;
 
   
   var paginar = function () {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    var end = begin + $scope.numPerPage;
	    $scope.listaResultados = $scope.tamanos.slice(begin, end);
	    };
	
   //Muestra el listado de todos los tamaños

	//funcion para listar tamaños
	   $scope.buscar={};
	
		$scope.listar=function(){
			console.log("listar Tamaños");
			JSONRequestDispatcher.post('/api/tamanio/obtenerTamanios',$scope.buscar)
			.then(function(res){
				$scope.tamanos = res.data;
				paginar();
			});
		}
	
	$scope.listar();
	console.log("hola mundo");
	

	/*llamamos a la paginacion para motrar los datos */
       $scope.$watch('currentPage + numPerPage', function() {
		    paginar();
		});	
	
	
	//borrar tamaño
	$scope.confirmarBorrado=function(tamano){
		$scope.Btamano=tamano;
		$('#deleteDialog').modal();
	}
	$scope.borrarTamano = function(){
		console.log("borrar");
		JSONRequestDispatcher.delete('/api/tamanio/eliminarTamanio',$scope.Btamano)
		.then(function successCallback(response) {
			console.log(response.data);
			$scope.listar();
		}
		,function errorCallback(response){
			$("#errorDialog").modal();
			$scope.listar();
		});
		$('#deleteDialog').modal('hide');
		delete $scope.Btamano;
	};

  

//Dar de alta un Tamaño

	console.log("alta Gestion tamaños");
	$scope.altaTam={};
	$scope.darDeAlta=function(){
		console.log($scope.altaTam);
		JSONRequestDispatcher.post('/api/tamanio/crearTamanio',$scope.altaTam)
		.then(function successCallback(response) {
			$location.path("/tamano/");
		});
	}



//editar tamaño

	    $scope.obtenerId=function(){
		var id=$routeParams.id;
		console.log("editar tamaño "+id);
		JSONRequestDispatcher.post('/api/tamanio/obtenerTamanios',{'id':id})
		.then(function(res){
			$scope.editarTamano=res.data[0];
		});
	    };
		$scope.obtenerId();

	$scope.editar=function(){
		
		console.log($scope.editarTamano);
		JSONRequestDispatcher.put('/api/tamanio/actualizarTamanio',$scope.editarTamano)
		.then(function successCallback(response) {
			$location.path("/tamano/");
		});
	}

});