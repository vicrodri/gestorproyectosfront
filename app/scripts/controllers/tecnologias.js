'use strict';

angular.module('frontApp')
.controller('TecCtrl', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher) {

	/**Paginacion:
	 definimos los scopes de la vista para la paginacion
	 y la variable paginar*/
	 	
	$scope.listaResultados = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 5;
	
	var paginar = function () {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		var end = begin + $scope.numPerPage;
		$scope.listaResultados = $scope.tecnologias.slice(begin, end);
	}
	
	

//Muestra el listado de todas las tecnologias o las dadas por el buscador
	//recoge los datos puestos en los cuadros de texto del buscador
	$scope.buscar={'nombre':'','lenguaje':'','capa':''};
	//llama a la funcion a listar para mostrar los datos
	$scope.listar=function(){
		console.log("listar tecnologias");
		JSONRequestDispatcher.post('/api/tecnologia/obtenerTecnologias',$scope.buscar)
		.then(function(res){
			$scope.tecnologias = res.data;
			//llama a la paginacion para mostrar los datos paginados
			$scope.mostrarTabla = true;
			$scope.$watch('currentPage',function () {paginar()});
		});
	}

	
	//borrar tecnologia:
	//lanza la ventana que pregunta si se borra o no
	$scope.confirmarBorrado=function(tecnologia){
		$scope.Btecnologia=tecnologia;
		$('#deleteDialog').modal();
	}
	//borra la tecnologia elegida
	$scope.borrarTecnologia = function(){
		console.log("borrar");
		JSONRequestDispatcher.delete('/api/tecnologia/eliminarTecnologia',$scope.Btecnologia)
		.then(function successCallback(response) {
			console.log(response.data);
			//refresca los datos para comprobar si se efectuo el borrado
			$scope.listar();
		}
		,function errorCallback(response){
			$scope.errordialog=response.data[0].errorMsg;
			console.log(response.data[1].errorCode);
			$("#errorDialog").modal();
			$scope.listar();
		});
		$('#deleteDialog').modal('hide');

	};
  


//Dar de alta una nueva tecnologia
	
	$scope.altaTec={};
	$scope.darDeAlta=function(){
		console.log("alta tecnologia");
		JSONRequestDispatcher.post('/api/tecnologia/crearTecnologia',$scope.altaTec)
		.then(function successCallback(response) {
			$location.path("/tecnologias/buscar-listado/");
		});
	}




//edita tecnologias

		var id=$routeParams.id;
		console.log("editar tecnologia");
		JSONRequestDispatcher.post('/api/tecnologia/obtenerTecnologias',{'id':id})
		.then(function(res){
			$scope.editarTecnologia=res.data[0];
		});

	$scope.editar=function(){
		
		console.log($scope.editarTecnologia);
	
		JSONRequestDispatcher.put('/api/tecnologia/actualizarTecnologia',$scope.editarTecnologia)
		.then(function successCallback(response) {
			$location.path("/tecnologias/buscar-listado/");
		});
	}
});