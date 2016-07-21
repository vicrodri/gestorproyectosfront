'use strict';

angular.module('frontApp')

	/**
	 * Métodos generales para acceder a los servicios REST que incluyen una cabecera explícita
	 * con el tipo de contenido que se envía.
	 * 
	 *  Los parámetros son la url del servicio REST y el objeto que se envía al servidor con los
	 *  datos necesarios para la transacción.
	 */
	.service('JSONRequestDispatcher', function($http){
	
		this.get = function(url){
			return $http.get(url);
		};
		
		this.post = function(url, data){
			return $http.post(url, data, {headers: {'Content-Type': 'application/json'}});
		};
		
		this.put = function(url, data){
			return $http.put(url, data, {headers: {'Content-Type': 'application/json'}});
		};
		
		this.delete = function(url, data){
			return $http.delete(url,{headers: {'Content-Type': 'application/json'}, data});
		};
});