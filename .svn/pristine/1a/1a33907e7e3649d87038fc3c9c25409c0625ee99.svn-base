'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:GruposTareasCtrl
 * @description
 * # GruposTareasCtrl
 * Controlador de la parte "grupos de tareas"
 */
angular.module('frontApp')
	.controller('GruposTareasCtrl', function ($scope, $http, $routeParams, clientService, $location, $timeout, JSONRequestDispatcher) {
		
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
				arquitecturas: null,
				items: null,
				complejidades: null,
				tamanios: null,
				buscarItems: null
		};
		$scope.comboModels = {								// Modelos de los desplegables
					arquitectura: {},
					item: {},
					complejidad: {},
					tamanio: {}
		};
		$scope.pagina = [];									// Elementos que se mostrarán en la página de resultados.
		$scope.currentPage = 1;								// Página actual de resultados.
		$scope.numPerPage = 5;								// Número de elementos por página.
		
		/* Cuando se cambia la ruta se recoge el item con el que estamos trabajando */
		$scope.$on('$routeChangeSuccess', function(event, next, current){
			if ( next.$$route.mode == 'edit' ){
					$scope.comboModels = getItem(next.params.idx);
					$scope.newLegend = 'Edición de grupo de tareas';

			} else if ( next.$$route.mode == 'new' ){
					$scope.newLegend = 'Alta de grupo de tareas';
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
		/*		ELEMENTOS DE LOS DESPLEGABLES				*/
		/****************************************************/
		var combos = {
				arquitecturas: (function(){
					
					JSONRequestDispatcher.get('/api/arquitectura/getAllArq')
					
					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.arquitecturas = response.data;
						$scope.combos.buscarItems = combos.items;

						/* En la pantalla de edición se realiza una búsqueda de items
						 * una vez fijada la arquitectura. */
						if ( $scope.mode == 'edit')
							$scope.combos.buscarItems();

						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.arquitecturas = null;
					})
				})(),
				
				items: function(){

					/* Petición */
					JSONRequestDispatcher.post('/api/item/obtenerItems', 
							{arquitectura: {id: $scope.comboModels.arquitectura.id}})
					
					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.items = response.data;
						
						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.items = null;
					})
					
				},
				complejidades: (function(){
					
					/* Petición al servidor */
					JSONRequestDispatcher.get('/api/complejidad/getAllComp')

					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.complejidades = response.data;
						
						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.complejidades = null;
					})
				})(),
				tamanios: (function(){
					
					/* Petición al servidor */
					JSONRequestDispatcher.get('/api/tamanio/getAllTamanios')

					/* Petición correcta */
					.then(function successCallback(response){
						$scope.combos.tamanios = response.data;
						
						/* Petición incorrecta */
					}, function errorCallback(response){
						$scope.combos.tamanios = null;
					})
				})()
		};
		
		/****************************************************/
		/*		BÚSQUEDA / LISTADO							*/
		/****************************************************/
		
		/* Hace la llamada al servidor y recoge los datos */
		$scope.buscar = function(){
			
			/* Se hace la petición al servidor con el objeto de búsqueda */
			JSONRequestDispatcher.post('/api/grupoTarea/obtenerGrupoTareas', $scope.comboModels)

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
			})
		};
		
		/****************************************************/
		/*		EDICIÓN										*/
		/****************************************************/

		$scope.editar = function(index){
			
			JSONRequestDispatcher.put('/api/grupoTarea/actualizarGrupoTarea', $scope.comboModels)
			
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
			$('#deleteDialog').modal();
		};
		
		/* Elimina el elemento indicado previamente en borrar() */
		$scope.confirmarBorrar = function(){
			JSONRequestDispatcher.delete('/api/grupoTarea/eliminarGrupoTarea', {id: $scope.itemIndex})

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
				$('#deleteDialog').modal('hide');
			});
		}
		
		/****************************************************/
		/*		ALTA										*/
		/****************************************************/
		/* Ejecuta el alta de un nuevo elemento */
		$scope.alta = function(){
			JSONRequestDispatcher.post('/api/grupoTarea/crearGrupoTarea', $scope.comboModels)

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