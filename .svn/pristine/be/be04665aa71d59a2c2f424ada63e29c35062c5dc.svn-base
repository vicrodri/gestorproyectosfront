'use strict';

angular.module('frontApp')
.controller('PersonaCtrl', function ($scope, $http, $routeParams,$location,JSONRequestDispatcher,$filter) {
	
	$scope.mode = 'list';
	$scope.buscar={'nombre':'','inactivo':'','primerApellido':'','segundoApellido':''};
	$scope.Persona={};
	$scope.format = 'dd/MM/yyyy';
	$scope.popup = {opened: false}
	var splitDate = null;
	
	$scope.listar=function(){
		console.log("listar gestion personas");
		JSONRequestDispatcher.post('/api/persona/obtenerPersonas',$scope.buscar)
		.then(function(res){
			$scope.gesPersonas = res.data;
		});
	}
	
	$scope.open = function() {
		$scope.popup.opened = true;
	}
	
	
	$scope.$on('$routeChangeSuccess', function(event, next, current){
		if ( next.$$route.mode == 'edit' ){
			$scope.leyenda="Editar Persona";
			var id=$routeParams.id;
			console.log("editar tecnologia");
			JSONRequestDispatcher.post('/api/persona/obtenerPersonas',{'id':id})
			.then(function(res){
				$scope.Persona=res.data[0];
				splitDate = $scope.Persona.fechaEntrada.split('/');
				$scope.fechaCompleta = new Date(parseInt(splitDate[2]), parseInt(splitDate[1]) - 1, parseInt(splitDate[0]), 0, 0, 0);
			});
			
		
		}else if ( next.$$route.mode == 'alta' ){
			$scope.leyenda="Alta Persona"
			console.log("alta Persona");
			
		}
		$scope.mode = next.$$route.mode;
	});
	
	
	
//Dar de alta una nueva Persona

	$scope.darDeAlta=function(){
		$scope.Persona.fechaEntrada=$filter('date')($scope.fechaCompleta,$scope.format);
		JSONRequestDispatcher.post('/api/persona/crearPersona',$scope.Persona)
		.then(function successCallback(response) {
			$location.path("/GesPersonas/");
		});
	}
	

//Editar Persona
	
	$scope.editar=function(){
		console.log("tururu");
		$scope.Persona.fechaEntrada=$filter('date')($scope.fechaCompleta,$scope.format);
	
		JSONRequestDispatcher.put('/api/persona/actualizarPersona',$scope.Persona)
		.then(function successCallback(response) {
			$location.path("/GesPersonas/");
		});
	}
});