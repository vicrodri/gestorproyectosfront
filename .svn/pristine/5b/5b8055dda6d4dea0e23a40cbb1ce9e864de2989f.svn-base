
'use strict';
function controlArquitecturas($scope, $http, $routeParams, $location, $timeout, JSONRequestDispatcher)
{
	$scope.arquitecturas;
	$scope.opciones;
	$scope.clientes;
	$scope.filter={};
	$scope.data={};
	$scope.mode='list';
	$scope.paginaArquitecturas=[];
	$scope.sizeValues=[5,10,15];
	$scope.currentPage=1;
	var paginar = function () {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		var end = begin + $scope.numPerPage;
		$scope.paginaArquitecturas = $scope.arquitecturas.slice(begin, end);
	}
	//Cambia variable mode para guardar el contexto en el que se esta
	$scope.$on('$routeChangeSuccess', function(event, next, current){
		
		$scope.mode = next.$$route.mode;
		if($scope.mode=='editar')
			{
				$scope.filter={'id':$routeParams.id};
				$scope.listar(true)
			}
	});
	//Abre la ventana modal para confirmar cambios
	$scope.confirmar=function()
	{
		$("#confirmDialog").modal();
	};
	//Function para editar/subir objetos de Arquitectura mediante el servicio
	//JSONRequestDispatcher
	$scope.submit=function()
	{
		$("#confirmDialog").modal('hide');
		var url;
		console.log($scope.mode);
		$scope.mode=='alta'?url='/api/arquitectura/crearArq':$scope.mode=='editar'?url='/api/arquitectura/actualizarArq':url=null;
		console.log(url);
		($scope.mode=='alta'?JSONRequestDispatcher.post(url,$scope.data):JSONRequestDispatcher.put(url,$scope.data)).then(function successCallback(response) {

			console.log(response.data);
			$("#okDialog").modal();
			
		}, function errorCallback(response) {
			$("#errorDialog").modal();
		});

		$location.path("/arq/");

	};
	//quita el background que dejan las modales(bug de ultimas versiones de bootstrap
	$scope.salir=function()
	{
		//hay un bug en angular-ui, no borrar el backdrop
		$('.modal-backdrop').remove();
		$location.path("/arq/");
	}
	//rellenar combo de clientes
		$scope.getClientes=function()
		{
JSONRequestDispatcher.get('/api/cliente/getAllClientes').then(function successCallback(response) {

				$scope.clientes=response.data;
				$scope.data.cliente=$scope.clientes[0];

			}, function errorCallback(response) {
				console.log("error");
			});
			
		};
	//busquedas en base de datos para arquitecturas(filtrado o no)
	//ondata es un booleano para decidir si colocar o no en el formulario(para ediciones)
	$scope.listar=function(onData)
	{	
		JSONRequestDispatcher.post("/api/arquitectura/obtenerArq",$scope.filter).then(function successCallback(response) {

			console.log("ok,QUERY RESULT="+response.data.length);
			if(!onData)
				{
			$scope.arquitecturas=response.data;
			$scope.mostrar=true;
			$scope.$watch('currentPage',function () {paginar()});
			$scope.$watch('numPerPage',function () {paginar()});
				}
			else
				$scope.data=response.data[0];

		}, function errorCallback(response) {
			console.log("error");
		
		});

	};
	$scope.borrar=function(id)
	{

		$("#deleteDialog").modal();
		$scope.idBorrar=id;
	}
	//Abre modal para confirmar borrado
	$scope.confirmarBorrar=function()
	{
		$("#deleteDialog").modal('hide');
		var id=$scope.idBorrar;
		JSONRequestDispatcher.delete('/api/arquitectura/eliminarArq',{'id':id}).then(function successCallback(response) {

			$scope.listar();

		}, function errorCallback(response) {
			$("#errorDialog").modal();
			$scope.listar();
		});

		delete $scope.idBorrar;
	};

	$scope.editar=function(id)
	{

		$location.path("/arq/editar/"+id);

	};

	$scope.getClientes();

}
app.controller("controlArq", controlArquitecturas);