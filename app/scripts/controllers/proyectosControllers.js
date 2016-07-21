function controlProyectos($scope,$http,JSONRequestDispatcher,$location,$routeParams,uibDateParser)
{
	$scope.format = 'dd/M/yyyy';
	$scope.date = new Date();
	$scope.opciones;
	$scope.clientes;
	$scope.filter={};
	$scope.data={};
$scope.$on('$routeChangeSuccess', function(event, next, current){
		
		$scope.mode = next.$$route.mode;
		if($scope.mode=='alta')
			{
				$scope.mostrar=true;
			
			
			}
		else{
			if($scope.mode=='editar'||$scope.mode=='mostrarDetalle')
				{
				$scope.filter={'id':$routeParams.id};
				$scope.listar(true);
		
				}
			else
				{
				$scope.listar(false)
	
				
				}
			
		}
		$scope.loadClientes();
	});
$scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };
$scope.popup1 = {
	    opened: false
	  };
$scope.openCalendar=function()
{
	 $scope.popup1.opened = true;
	};
	$scope.listar=function(editar)
	{	
		
		console.log($scope.filter);
		JSONRequestDispatcher.post('api/proyecto/obtenerProyectos',$scope.filter).then(function successCallback(response) {

			console.log("ok,QUERY RESULT="+response.data.length);
			if(editar)
				$scope.data=response.data[0];
			else{
			$scope.proyectos=response.data;
			
			}
			if(response.data.length>0)
			$scope.mostrar=true;
			else $scope.mostrar=false;
		}, function errorCallback(response) {
			console.log("error");
			$scope.mostrar=false;
		});

	};
	$scope.editar=function(id)
	{

		$location.path("/proyectos/editar/"+id);

	};
	$scope.loadClientes=function()
	{
		JSONRequestDispatcher.post("api/cliente/obtenerClientes",{}).then(function successCallback(response) {
			$scope.clientes=response.data;
		}, function errorCallback(response) {
			console.log("error");
		});
		
	};
	//Realizar actualizacion
	$scope.actualizarProyecto=function()
	{
		
	JSONRequestDispatcher.put('api/proyecto/actualizarProyecto',$scope.data)
		.then(function successCallback(response) {
		console.log("ok");
		$location.path("/proyectos/");
		$scope.operation=false;
		}, function errorCallback(response) {
			console.log("error");
			$scope.error=true;
			$scope.errorMsg=response.data[0];
		});
	};
//mostrar detalle proyecto
	
	$scope.mostrarDetalle=function(proyecto){
		$scope.data=proyecto;
		$('#detalleDialog').modal();
		//$location.path("/proyectos/mostrarDetalle/"+$scope.data.id);
	};
	$scope.detalle=function(direccion){
		$('#detalleDialog').hide();
		$('.modal-backdrop').hide();
		console.log(direccion);
		$location.path(direccion);
	}
	
	
	//Crear proyecto
	$scope.crearProyecto=function()
	{
	JSONRequestDispatcher.post("api/proyecto/crearProyecto",$scope.data)
		.then(function successCallback(response) {
		console.log("ok "+$scope.data.fechaInicio);
		$location.path("/proyectos/");
		$scope.operation=false;
		}, function errorCallback(response) {
			console.log("error");
			$scope.error=true;
			$scope.errorMsg=response.data[0];
		});
	};
		

}

app.controller("controlProyectos",controlProyectos);
