'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controlador de la parte "Clientes"
 */
angular.module('frontApp')
	.controller('ClientsCtrl', function ($scope, $http, $routeParams, clientService, JSONRequestDispatcher) {
		
		var STATUS_OK = 'ok';
		var STATUS_KO = 'ko';
		
		$scope.termino = '';								// Término de búsqueda asociado al cajón.
		$scope.mostrarTabla = false;						// Flag para mostrar la tabla de resultados.
		$scope.mode = 'list';								// Modo de la página.
		$scope.item = {										// Item a editar / borrar.
				id: null,
				nombre: '',
				descripcion: '',
				arquitecturas: []
		};									
		$scope.itemIndex = -1;								// Índice del ítem con el que se está trabajando.
		$scope.newLegend = '';								// Legend del formulario de alta/edición.
		$scope.resultados = [];								// Resultados de la búsqueda.
		$scope.actionResult = {								// Mensajes al usuario.
				status: '',
				errorCode: '',
				errorMsg: '',
				okMsg: 'Transacción realizada correctamente.',
				koMsg: 'Ha ocurrido un error.'
		};
		$scope.pagina = [];									// Elementos que se mostrarán en la página de resultados.
		$scope.currentPage = 1;								// Página actual de resultados.
		$scope.numPerPage = 5;								// Número de elementos por página.
		
		
		/* Cuando se cambia la ruta se recoge el item con el que estamos trabajando */
		$scope.$on('$routeChangeSuccess', function(event, next, current){
			if ( next.$$route.mode == 'edit' ){
				$scope.item = getItem(next.params.idx);
				$scope.newLegend = 'Edición de cliente';
			} else if ( next.$$route.mode == 'new' ){
					$scope.newLegend = 'Alta de cliente';
			}
			/* Se actualiza el modo */
			$scope.mode = next.$$route.mode;
		});
		
		/* Obtiene el elemento del listado con el que estamos trabajando a partir de 
		 * su id. */
		function getItem(idx){
			for ( var i = 0, ii = clientService.data.length; i < ii; i++){
				if ( parseInt(clientService.data[i].id) == idx )
					return clientService.data[i];
			}
		};
		
		/****************************************************/
		/*		BÚSQUEDA / LISTADO							*/
		/****************************************************/
		
		/* Hace la llamada al servidor y recoge los datos */
		$scope.buscar = function(){
			
			/* Se incluye el término de búsqueda en el objeto. */
			$scope.item.nombre = $scope.termino;
			
			/* Se hace la petición al servidor con el término de búsqueda */
			JSONRequestDispatcher.post('/api/cliente/obtenerClientes', $scope.item)

			/* Petición correcta */
			.then(function successCallback(response){
				
				/* Se guardan los resultados de la búsqueda */
				$scope.resultados = response.data;
				clientService.data = response.data;
				
				/* Se define el status de la acción */
				$scope.actionResult.status = STATUS_OK;
				
				/* Se muestra la tabla de resultados */
				$scope.mostrarTabla = true;
				
				/* Se controla cuando cambia la página actual o el número de páginas */
				$scope.$watch('currentPage + numPerPage', function(){
					
					/* Primer resultado a mostrar (inicio del array de resultados por página) */
					var begin = (($scope.currentPage - 1) * $scope.numPerPage);
					
					/* Último resultado a mostrar (fin del array de resultados por página) */
					var end = begin + $scope.numPerPage;
					
					/* Se define el array de resultados que se mostrará en la página actual */					
					$scope.pagina = $scope.resultados.slice(begin, end);
				});

			/* Petición incorrecta */
			}, function errorCallback(response){
				
				/* Se definen los mensajes a mostrar por pantalla al usuario. */
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
			})
			.finally(function(){
				
				/* Se elimina el término de búsqueda. */
				$scope.termino = '';
			});
		};
		
		
		/****************************************************/
		/*		EDICIÓN										*/
		/****************************************************/

		$scope.editar = function(index){
			JSONRequestDispatcher.put('/api/cliente/actualizarCliente', $scope.item)
			
			/* Se definen los mensajes a mostrar */
			.then(function successCallback(response){
				$scope.actionResult.status = STATUS_OK;
			}, function errorCallback(response){
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
			})
			.finally(function(){
				/* Se vacía el array de resultados de la búsqueda realizada inicialmente */
				clientService.data = [];
			});
		};
		
		
		/****************************************************/
		/*		BORRADO										*/
		/****************************************************/
		
		/* Abre el cuadro de diálogo de confirmación del borrado */
		$scope.borrar = function(index){
			$scope.itemIndex = index;
			angular.element('#deleteDialog').modal('show');
		};
		
		/* Elimina el elemento indicado previamente en borrar() */
		$scope.confirmarBorrar = function(){
			JSONRequestDispatcher.delete('/api/cliente/eliminarCliente', {id: $scope.itemIndex})
			
			/* Se definen los mensajes a mostrar */
			.then(function successCallback(response){
				
				/*Se hace una nueva búsqueda */
				$scope.buscar();
				
				/* Se define el status de la acción */
				$scope.actionResult.status = STATUS_OK;

			}, function errorCallback(response){
				
				/* Mensajes a mostrar por pantalla al usuario */
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
				
			})
			.finally(function(){
				
				/* Se oculta el cuadro modal */
				angular.element('#deleteDialog').modal('hide');
			});
		}
		
		/****************************************************/
		/*		ALTA										*/
		/****************************************************/
		/* Ejecuta el alta de un nuevo elemento */
		$scope.alta = function(){
			JSONRequestDispatcher.post('/api/cliente/crearCliente', $scope.item)
			
			/* Se definen los mensajes a mostrar */
			.then(function successCallback(response){
				$scope.actionResult.status = STATUS_OK;
			}, function errorCallback(response){
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
			})
			.finally(function(){
				/* Se vacía el array de resultados de la búsqueda realizada inicialmente */
				clientService.data = [];
			});
		};
	})
	
	/* Se crea un servicio para mantener ciertos datos en todo el proceso */
	.factory('clientService', function(){
		var service = {
				data: []
		};
		return service
	});