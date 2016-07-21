app.controller("controlItems",controlItems);
function controlItems($scope,$http,JSONRequestDispatcher,$location,$routeParams)
{
	//variable para guardar datos del filtro de búsqueda
	$scope.filter={};
	//Variable para guardar datos en alta/editar
	$scope.data={};
	$scope.paginasItems=[];
	$scope.sizeValues=[5,10,15];
	$scope.currentPage=1;
	$scope.data.arquitectura={};
	var paginar = function () {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		var end = begin + $scope.numPerPage;
		$scope.paginasItems = $scope.items.slice(begin, end);
	}
$scope.$on('$routeChangeSuccess', function(event, next, current){
		//Guardar modo actual 
		$scope.mode = next.$$route.mode;
		if($scope.mode=='alta')
			{
				$scope.mostrar=true;
				$scope.cargarArquitecturas();
			
			}
		else{
			if($scope.mode=='editar')
				{
				console.log("filtrando por id:"+$routeParams.id)
				$scope.filter={'id':$routeParams.id};
				$scope.listar(true);
				$scope.cargarArquitecturas();
				
		
				}
			else
				{
				//$scope.listar(false);
				$scope.cargarArquitecturas();
				}
			
		}
		$scope.loadClientes();
	});
	//Function listado de Items
	$scope.listar=function(editar)
	{	
		
		console.log($scope.filter);
		JSONRequestDispatcher.post('api/item/obtenerItems',$scope.filter).then(function successCallback(response) {

			console.log("ok,QUERY RESULT="+response.data.length);
			if(editar){
				$scope.data=response.data[0];

				
			}
			else{
			$scope.items=response.data;
			$scope.$watch('currentPage',function () {paginar()});
			$scope.$watch('numPerPage',function () {paginar()});
			}
			if(response.data.length>0)
			$scope.mostrar=true;
			else $scope.mostrar=false;
		}, function errorCallback(response) {
			console.log("error");
			$scope.mostrar=false;
		});

	};
	//Cambia el path para editar el objeto seleccionado
	$scope.editar=function(id)
	{
		console.log("mover a edit");
		$location.path("/items/editar/"+id);

	};
	//Carga el desplegable de clientes para edición, búsqueda o alta.
	$scope.loadClientes=function()
	{
		JSONRequestDispatcher.post("api/cliente/obtenerClientes",{}).then(function successCallback(response) {
			$scope.clientes=response.data;
		}, function errorCallback(response) {
			console.log("error");
		});
		
	};
	//Cargar desplegable arquitecturas
	$scope.cargarArquitecturas=function()
	{
		JSONRequestDispatcher.get('api/arquitectura/getAllArq').then(function(response){$scope.arquitecturas=response.data;});
	};
	//Actualizar item
	$scope.actualizarItem=function()
	{
	JSONRequestDispatcher.put('api/item/actualizarItem',$scope.data)
		.then(function successCallback(response) {
		console.log("ok");
		$scope.operation=false;
		}, function errorCallback(response) {
			console.log("error");
			$scope.error=true;
			$scope.errorMsg=response.data[0];
		});
	
	$location.path("/items/");
	};
	//CREAR item
	$scope.crearItem=function()
	{
		console.log("subiendo item");
		console.log($scope.data);
		JSONRequestDispatcher.post('api/item/crearItem',$scope.data)
			.then(function successCallback(response) {
				console.log("ok");

		}, function errorCallback(response) {
			console.log("error");
			$scope.error=true;
			console.log(response.data[0].errorMsg);
		});
	$location.path("/items/");
	};
	$scope.splitArray= function(array,property)
	{
		var myString='';
		for(var i=0;i<array.length;i++)
		{
			myString+=' '+array[i][property];
		}

		myString=myString.trim();
		myString=myString.replace(/ /g,',');
		return myString;

	};
	
	
	//Borrar item
	$scope.borrar=function(item)
	{

		$("#deleteDialog").modal();
		$scope.Bitem=item;
	}
	//Abre modal para confirmar borrado
	$scope.confirmarBorrar=function()
	{
		$("#deleteDialog").modal('hide');
		var id=$scope.Bitem.id;
		JSONRequestDispatcher.delete('/api/item/eliminarItem',{'id':id})
		.then(function successCallback(response) {
        $scope.listar();

		}, function errorCallback(response) {
			$scope.errordialog=response.data[0].errorMsg;
			console.log(response.data[0].errorCode);
			$("#errorDialog").modal();
			$scope.listar();
			
		});
		
		
	
	$('#deleteDialog').modal('hide');

		delete $scope.Bitem;
	};
	//Función que añade al modelo la tecnología asociada al checkbox pulsado
	$scope.toggle=function(tec)
	{
	if(!$scope.data.tecnologias)$scope.data.tecnologias=[];
	var pos=$scope.indexOf($scope.data.tecnologias,"id",tec.id);
		if(pos>-1)
			$scope.data.tecnologias.splice(pos,1);
		else
		$scope.data.tecnologias.push(tec);
	};
	//Devuelve la posición de un objeto en el array pasado por parámetro
	//Realiza la búsqueda según una propiedad(string) y el valor esperado(usar con ID)
	$scope.indexOf=function(array,property,value)
	{
		console.log(property+" "+value);
		for(var i=0;i<array.length;i++)
			{
				if(array[i][property]==value)
					return i;
				
			}
		return -1;
	}
	$scope.$watch('data.arquitectura',function () {$scope.cargarTecnologias()});
	$scope.cargarTecnologias=function()
	{
		if($scope.data.arquitectura&&$scope.mode!='listar')
		JSONRequestDispatcher.get("/api/tecnologia/getTecnologiasArquitectura?id="+$scope.data.arquitectura.id).then(function(response){
			$scope.tecnologiaArquitectura=response.data;
			
		}
		);
	};
	$scope.slaves=[];
		
}
