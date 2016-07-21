'use strict';

/**
 * @ngdoc overview
 * @name frontApp
 * @description
 * # frontApp
 *
 * Main module of the application.
 */
//Variables para cada sección de la app
var arqSubpath="/arq/";
var clientesSubpath="/clientes/";
var complejidadesSubpath= "/complejidades/";
var tecnologiasSubpath="/tecnologias/";
var itemSubpath="/items/";
var gesTareas="/GesTareas/";
var gesTamano="/tamano/";
var gruposTareas = "/GruposTareas/";
var rolesSubpath="/roles/";
var gesPersonas="/GesPersonas/"
var proyectos="/proyectos/";
var entregasSubpath="/entregas/";
var app=angular
  .module('frontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	  $routeProvider.when('/', {
		  templateUrl: 'views/partials/blank.html',
		  controller: 'MainCtrl'
	  })
	  //arquitecturas
	  .when(arqSubpath,{
		  templateUrl:'views/partials/arquitecturas/listado_ARQ.html',
		  controller:'controlArq',
		  model:'list'
	  })
	  .when(arqSubpath+"altas",{
		  templateUrl:'views/partials/arquitecturas/alta_ARQ.html',
		  controller:'controlArq',
		  mode:'alta'
	  })
	  .when(arqSubpath+"editar/:id",{
		  templateUrl:'views/partials/arquitecturas/editar_ARQ.html',
		  controller:'controlArq',
		  mode:'editar'
	  })
	  /* Tecnologias */
	  .when(tecnologiasSubpath+"buscar-listado",{
		  templateUrl:'views/partials/tecnologias/buscar-listado.html',
		  controller:'TecCtrl'
	  })
	  .when(tecnologiasSubpath+"alta",{
		  templateUrl:'views/partials/tecnologias/alta.html',
		  controller:'TecCtrl'
	  })
	  .when(tecnologiasSubpath+"editar/:id",{
		  templateUrl:'views/partials/tecnologias/editar.html',
		  controller:'TecCtrl'
	  })
	  
	  /* Clientes */
	  .when(clientesSubpath,{
		  templateUrl: 'views/partials/clientes/listado.html',
		  controller: 'ClientsCtrl',
		  mode: 'list'
	  })
	  .when(clientesSubpath + 'alta',{
		  templateUrl: 'views/partials/clientes/alta.html',
		  controller: 'ClientsCtrl',
		  mode: 'new'
	  })
	  .when(clientesSubpath + 'editar/:idx', {
		  templateUrl: 'views/partials/clientes/alta.html',
		  controller: 'ClientsCtrl',
		  mode: 'edit'
	  })
	  .when(clientesSubpath + 'borrar/:idx', {
		  templateUrl: 'views/partials/clientes/borrar.html',
		  controller: 'ClientsCtrl',
		  mode: 'delete'
	  })
	  
	  /* Complejidades */
	  .when(complejidadesSubpath,{
		  templateUrl: 'views/partials/complejidades/listado.html',
		  controller: 'ComplejidadesCtrl',
		  mode: 'list'
	  })
	  .when(complejidadesSubpath + 'alta',{
		  templateUrl: 'views/partials/complejidades/alta.html',
		  controller: 'ComplejidadesCtrl',
		  mode: 'new'
	  })
	  .when(complejidadesSubpath + 'editar/:idx', {
		  templateUrl: 'views/partials/complejidades/alta.html',
		  controller: 'ComplejidadesCtrl',
		  mode: 'edit'
	  })
	  .when(complejidadesSubpath + 'borrar/:idx', {
		  templateUrl: 'views/partials/complejidades/borrar.html',
		  controller: 'ComplejidadesCtrl',
		  mode: 'delete'
	  })
	  
	  /* Grupos de tareas */
	  .when(gruposTareas,{
		  templateUrl: 'views/partials/GruposTareas/listado.html',
		  controller: 'GruposTareasCtrl',
		  mode: 'list'
	  })
	  .when(gruposTareas + 'alta',{
		  templateUrl: 'views/partials/GruposTareas/alta.html',
		  controller: 'GruposTareasCtrl',
		  mode: 'new'
	  })
	  .when(gruposTareas + 'editar/:idx', {
		  templateUrl: 'views/partials/GruposTareas/alta.html',
		  controller: 'GruposTareasCtrl',
		  mode: 'edit'
	  })
	  .when(gruposTareas + 'borrar/:idx', {
		  templateUrl: 'views/partials/GruposTareas/borrar.html',
		  controller: 'GruposTareasCtrl',
		  mode: 'delete'
	  })
	  
	  /* Asignaciones */
	  .when('/asignaciones',{
		  templateUrl: 'views/partials/asignaciones/listado.html',
		  controller: 'asignacionesCtrl',
		  mode: 'list'
	  })
	  .when('/asignaciones/alta',{
		  templateUrl: 'views/partials/asignaciones/alta.html',
		  controller: 'asignacionesCtrl',
		  mode: 'new'
	  })
	  .when('/asignaciones/editar/:idx', {
		  templateUrl: 'views/partials/asignaciones/alta.html',
		  controller: 'asignacionesCtrl',
		  mode: 'edit'
	  })
	  .when('/asignaciones/borrar/:idx', {
		  templateUrl: 'views/partials/asignaciones/borrar.html',
		  controller: 'asignacionesCtrl',
		  mode: 'delete'
	  })
	  
	  //items
	  .when(itemSubpath, {
		  templateUrl: 'views/partials/items/listado_ITEMS.html',
		  controller: 'controlItems', mode:'listar'
	  })
	  .
	  when(itemSubpath+"altas", {
		  templateUrl: 'views/partials/items/alta_items.html',
		  controller: 'controlItems',mode:'alta'
	  }).
	  when(itemSubpath+"editar/:id",{templateUrl:'views/partials/items/editar_item.html',controller:'controlItems',mode:'editar'}).
	  //GESTION TAREAS
	  when(gesTareas,{
		  templateUrl:'views/partials/GestionTareas/listado_tareas.html',
		  controller:'controlTareas',
		  mode:'listar'
	  }).
	  when(gesTareas+"editar/:id",{
		  templateUrl:'views/partials/GestionTareas/editar_tareas.html',
		  controller:'controlTareas',
		  model:'editar'
	  }).
	  when(gesTareas+'alta',{
		  templateUrl:'views/partials/GestionTareas/alta_tareas.html',
		  controller:'controlTareas',
		  mode:'alta'
	  })
	  /* Gestion de Tamaños */
	  .when(gesTamano,{
		  templateUrl:'views/partials/Tamanos/listado.html',
		  controller:'TamCtrl'
	  })
	  .when(gesTamano+"editar/:id",{
		  templateUrl:'views/partials/Tamanos/editar.html',
		  controller:'TamCtrl'
	  })
	  .when(gesTamano+'alta',{
		  templateUrl:'views/partials/Tamanos/alta.html',
		  controller:'TamCtrl'
	  })
	   /*Gestion de Roles*/
	 .when(rolesSubpath+"listado_roles",{
		  templateUrl:'views/partials/roles/listado_roles.html',
		  controller:'RolCtrl'
	  })
	  .when(rolesSubpath+"alta",{
		  templateUrl:'views/partials/roles/alta_roles.html',
		  controller:'RolCtrl'
	  })
	  .when(rolesSubpath+"editar/:id",{
		  templateUrl:'views/partials/roles/editar_roles.html',
		  controller:'RolCtrl'
	  })
	   .otherwise({redirectTo:'/'})
	  /* Gestion de Personas */
	  .when(gesPersonas,{
		  templateUrl:'views/partials/GestionPersonas/buscar-listado.html',
		  controller:'PersonaCtrl',
		  mode: 'listado'
	  })
	  .when(gesPersonas+"editar/:id",{
		  templateUrl:'views/partials/GestionPersonas/alta.html',
		  controller:'PersonaCtrl',
		  mode: 'edit'
	  })
	  .when(gesPersonas+'alta',{
		  templateUrl:'views/partials/GestionPersonas/alta.html',
		  controller:'PersonaCtrl',
		  mode: 'alta'
	  })
	   /*Gestion de Entregas*/
	 .when(entregasSubpath,{
		  templateUrl:'views/partials/entregas/listado_entregas.html',
		  controller:'EntregasCtrl'
	  })
	   .when(entregasSubpath+"editar/:id",{
		  templateUrl:'views/partials/entregas/editar_entregas.html',
		  controller:'EntregasCtrl'
	  })
	  .when(entregasSubpath+"alta",{
		  templateUrl:'views/partials/entregas/alta_entregas.html',
		  controller:'EntregasCtrl'
	  })
	  /* Gestion de proyectos */
	  .when(proyectos+"mostrarDetalle/:id",{
		  templateUrl:'views/partials/proyectos/mostrarDetalle.html',
		  controller:'controlProyectos',mode:'mostrarDetalle'
	  })
	  .when(proyectos,{
		  templateUrl:'views/partials/proyectos/listado.html',
		  controller:'controlProyectos',mode:'listar'
	  }).
	  when(proyectos+"alta",
		{templateUrl:'views/partials/proyectos/alta.html',controller:'controlProyectos',mode:'alta'}	  
	  ).
	  when(proyectos+'editar/:id',{templateUrl:'views/partials/proyectos/editar.html',controller:'controlProyectos',mode:'editar'})
	  .otherwise({redirectTo:'/'})
  }]);
