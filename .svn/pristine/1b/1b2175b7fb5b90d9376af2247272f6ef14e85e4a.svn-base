'use strict';

angular.module('frontApp')
.controller('controlTareas', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher) {

	/**Paginacion:
	 definimos los scopes de la vista para la paginacion
	 y la variable paginar*/
	 	
	$scope.listaResultados = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 5;
	
	var paginar = function () {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		var end = begin + $scope.numPerPage;
		$scope.listaResultados = $scope.tareas.slice(begin, end);
	}
	
	

//Muestra el listado de todas las tecnologias o las dadas por el buscador
	//recoge los datos puestos en los cuadros de texto del buscador
	$scope.buscar={};
	//llama a la funcion a listar para mostrar los datos
	$scope.listar=function(){
		console.log("listar tareas");
		JSONRequestDispatcher.get('/api/tarea/getAllTareas',$scope.buscar)
		.then(function successCallback(res){
			$scope.tareas = res.data;
			console.log(res.data);
			//llama a la paginacion para mostrar los datos paginados
			$scope.mostrarTabla = true;
			$scope.$watch('currentPage',function () {paginar()});
		});
	}

	
	//borrar tecnologia:
	//lanza la ventana que pregunta si se borra o no
	$scope.confirmarBorrado=function(tarea){
		$scope.Btarea=tarea;
		$('#deleteDialog').modal();
	}
	//borra la tecnologia elegida
	$scope.borrarTarea = function(){
		console.log("borrar");
		JSONRequestDispatcher.delete('/api/tarea/eliminarTarea',$scope.Btarea)
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
	
	//Cargar arquitecturas,items,complejidades y tamaños
	JSONRequestDispatcher.post('/api/grupoTarea/obtenerGrupoTareas',$scope.buscar)
	.then(function(res){
		$scope.gruposTarea = res.data;
	});	
	
	$scope.altaTarea={};
	$scope.darDeAlta=function(){
		console.log("alta tecnologia");
		JSONRequestDispatcher.post('/api/tarea/crearTarea',$scope.altaTarea)
		.then(function successCallback(response) {
			$location.path("/GesTareas/");
		}, function errorCallback(response) {
			console.log(response.data[0].errorMsg)
		});
	}




//edita tarea

		var id=$routeParams.id;
		console.log("editar tecnologia");
		JSONRequestDispatcher.post('/api/tarea/obtenerTareas',{'id':id})
		.then(function(res){
			console.log(res.data[0])
			$scope.editarTarea=res.data[0];
		});

	$scope.editar=function(){
		
		console.log($scope.editarTarea);
	
		JSONRequestDispatcher.put('/api/tarea/actualizarTarea',$scope.editarTarea)
		.then(function successCallback(response) {
			$location.path("/GesTareas/");
		});
	}
});