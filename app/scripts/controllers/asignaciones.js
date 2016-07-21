'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:asignacionesCtrl
 * @description
 * # asignacionesCtrl
 * Controlador de la parte "gestión de asignaciones"
 */
angular.module('frontApp')
	.controller('asignacionesCtrl', function ($scope, $http, $routeParams, clientService, $filter, JSONRequestDispatcher) {
		
		var STATUS_OK = 'ok';
		var STATUS_KO = 'ko';
		
		$scope.mostrarTabla = false;						// Flag para mostrar la tabla de resultados.
		$scope.mode = 'list';								// Modo de la página.
		$scope.itemIndex = -1;								// Índice del ítem con el que se está trabajando.
		$scope.newLegend = '';								// Legend del apartado nuevo / editar.
		$scope.actionResult = {								// Estatus y mensajes al realizar una transacción.
				status: '',
				errorCode: '',
				errorMsg: '',
				okMsg: 'Transacción realizada correctamente.',
				koMsg: 'Ha ocurrido un error.'
		};
		$scope.combos = {									// Contenido de los desplegables.
				clientes: null,
				proyectos: null,
				personas: null,
				roles: null,
				buscarProyectos: null
		};
		$scope.asModels = {									// Modelos de los desplegables y cajones de fechas.
					proyecto: {
						cliente: {}
					},
					persona: {},
					rol: {},
					fechaInicio: null,
					fechaFin: null
		};
		$scope.proyectosFirstOpt = 'Seleccione primero un cliente'; // Primera opción del desplegable de proyectos. 
		$scope.pagina = [];									// Elementos que se mostrarán en la página de resultados.
		$scope.currentPage = 1;								// Página actual de resultados.
		$scope.numPerPage = 5;								// Número de elementos por página.
		$scope.date = {										// Fechas con el formato del ui-datepicker.
				fInicio: null, 
				fFin: null
		};			
		$scope.dateFormat = 'dd/MM/yyyy';					// Formato de fechas de los calendarios.
		$scope.calendarIsOpen = {							// Flag que indica si un calendario está abierto.
				inicio: false,
				fin: false
		};
		$scope.openCalendar = function(which){				// Abre o cierra un calendario; 'i' para fecha de inicio,
			if ( which == 'i' )								// 'f' para fecha de finalización.
				$scope.calendarIsOpen.inicio = true;
			else if ( which == 'f' )
				$scope.calendarIsOpen.fin = true;
		};
		/* Formatea la fecha para enviarla con el formato $scope.dateFormat al servicio REST */
		$scope.formatDate = function(){
			$scope.asModels.fechaInicio = $filter('date')($scope.date.fInicio, $scope.dateFormat);
			$scope.asModels.fechaFin = $filter('date')($scope.date.fFin, $scope.dateFormat)
		}
		
		/* Cuando se cambia la ruta se recoge el item con el que estamos trabajando */
		$scope.$on('$routeChangeSuccess', function(event, next, current){
			if ( next.$$route.mode == 'edit' ){
					$scope.asModels = getItem(next.params.idx);
					$scope.newLegend = 'Edición de asignaciones';
					
					/* 
					 * Se ajusta el formato de las fechas 
					 */
					var splitDate = null;					// Array con las partes de la cadena de la fecha.
					
					/* Se comprueba que la fecha inicial no es null */
					if ( $scope.asModels.fechaInicio != null ){
						
						/* Se parte la cadena de fecha */
						splitDate = $scope.asModels.fechaInicio.split('/');
						
						/* Se asigna al modelo un objeto Date a partir de la fecha devuelta por el servicio REST */
						$scope.date.fInicio = new Date(parseInt(splitDate[2]), parseInt(splitDate[1]) - 1, parseInt(splitDate[0]), 0, 0, 0);
					}
					/* Se realizan las mismas acciones para la fecha final */
					if ( $scope.asModels.fechaFin != null ){
						splitDate = $scope.asModels.fechaFin.split('/');
						$scope.date.fFin = new Date(parseInt(splitDate[2]), parseInt(splitDate[1]) - 1, parseInt(splitDate[0]), 0, 0, 0);
					}

			} else if ( next.$$route.mode == 'new' ){
					$scope.newLegend = 'Alta de asignaciones';
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
		}

		/****************************************************/
		/*		ELEMENTOS DE LOS DESPLEGABLES				*/
		/****************************************************/
		var combos = {
				clientes: (function(){
					
					JSONRequestDispatcher.get('/api/cliente/getAllClientes')
					
					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.clientes = response.data;
						$scope.combos.buscarProyectos = combos.proyectos;

						/* En la pantalla de edición se realiza una búsqueda de proyectos
						 * una vez fijado el cliente. */
						if ( $scope.mode == 'edit')
							$scope.combos.buscarProyectos();

						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.clientes = null;
					});
				})(),
				
				proyectos: function(){

					/* Si se ha seleccionado una opción vacía no se hace la petición, se resetea
					 * el objeto de proyectos y se cambia el texto de la primera opción. */
					if ( $scope.asModels.proyecto.cliente == null ){
						$scope.combos.proyectos = {};
						$scope.proyectosFirstOpt = 'Seleccione primero un cliente';
					}
					else {
						/* Petición */
						JSONRequestDispatcher.post('/api/proyecto/obtenerProyectos', 
								{cliente: {id: $scope.asModels.proyecto.cliente.id}})
						
						/* Petición correcta */
						.then(function successCallback(response){
							$scope.combos.proyectos = response.data;
							$scope.proyectosFirstOpt = 'Seleccione un proyecto';
	
							if ( $scope.combos.proyectos.length == 0 )
								$scope.proyectosFirstOpt = 'No existen proyectos para este cliente';
							
							/* Petición incorrecta */
						}, function errorCallback(response){
							$scope.combos.proyectos = null;
						});
					}					
				},
				personas: (function(){
					
					/* Petición al servidor */
					JSONRequestDispatcher.get('/api/persona/getPersonasActivas')

					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.personas = response.data;
						
						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.personas = null;
					});
				})(),
				roles: (function(){
					
					/* Petición al servidor */
					JSONRequestDispatcher.get('/api/rol/getAllRoles')

					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.roles = response.data;
						
						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.roles = null;
					});
				})()
		};
		
		/****************************************************/
		/*		BÚSQUEDA / LISTADO							*/
		/****************************************************/
		
		/* Hace la llamada al servidor y recoge los datos */
		$scope.buscar = function(){
			
			/* Se comprueba si los elementos de asModels son null y se cambian por un objeto vacío */
			if ( $scope.asModels.proyecto == null )
				$scope.asModels.proyecto = {};
				
			if ( $scope.asModels.persona == null )
				$scope.asModels.persona = {};
				
			if ( $scope.asModels.rol == null )
				$scope.asModels.rol = {};
			
			/* Se hace la petición al servidor con el objeto de búsqueda */
			JSONRequestDispatcher.post('/api/asignacion/obtenerAsignaciones', $scope.asModels)

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
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
			});
		};
		
		/****************************************************/
		/*		EDICIÓN										*/
		/****************************************************/

		$scope.editar = function(index){
			
			JSONRequestDispatcher.put('/api/asignacion/actualizarAsignacion', $scope.asModels)
			
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
			angular.element('#deleteDialog').modal();
		};
		
		/* Elimina el elemento indicado previamente en borrar() */
		$scope.confirmarBorrar = function(){
			JSONRequestDispatcher.delete('/api/asignacion/eliminarAsignacion', {id: $scope.itemIndex})

			/* Se definen los mensajes a mostrar */
			.then(function successCallback(response){
				
				/* Se hace una nueva búsqueda */
				$scope.buscar();
				$scope.actionResult.status = STATUS_OK;

			}, function errorCallback(response){
			
				$scope.actionResult.errorCode = response.data[0].errorCode;
				$scope.actionResult.errorMsg = response.data[0].errorMsg;
				$scope.actionResult.status = STATUS_KO;
			
			})
			.finally(function(){
				angular.element('#deleteDialog').modal('hide');
			});
		};
		
		/****************************************************/
		/*		ALTA										*/
		/****************************************************/
		/* Ejecuta el alta de un nuevo elemento */
		$scope.alta = function(){
			JSONRequestDispatcher.post('/api/asignacion/crearAsignacion', $scope.asModels)

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
		return service;
	});