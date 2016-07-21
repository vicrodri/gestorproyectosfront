function getters($http)
{
	var service={};
	/****************************************************/
	/*		ARQUITECTURAS							    */
	/****************************************************/
	service.getArquitecturas=function(filter)
	{
		console.log(filter);
		var req={};
		req.data=filter;
		req.url="/api/arquitectura/obtenerArq";
		req.method="POST";
		return $http(req);
	};
	service.altaArq= function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/arquitectura/crearArq';
		return $http(req);
	};
	service.deleteArq=function(id)
	{
		var req = {
				method: 'DELETE',
				url: '/api/arquitectura/eliminarArq',
		data:{'id':id}

		};
		
		return $http(req);
	};
	service.putArquitecturas=function(arq){
		var req = {
				method: 'PUT',
				url: '/api/arquitectura/actualizarArq',
				data:arq


		};
		return $http(req);
	};
	/****************************************************/
	/*		ITEMS						                */
	/****************************************************/
	service.getItems=function(filter)
	{
		var req={};
		console.log(filter);
		req.data=filter;
		req.url="/api/item/obtenerItems";
		req.method="POST";
		return $http(req);
	};
	service.altaItem=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/item/crearItem';
		return $http(req);
	};
	service.deleteItem=function(item)
	{
		var req={};
		req.method="DELETE";
		req.data=item;
		req.url='/api/item/eliminarItem';
		return $http(req);
	};
	
	/****************************************************/
	/*		TECNOLOGIAS							*/
	/****************************************************/
	service.getTecnologiasArq=function(filter)
	{
		var req={};
		req.method="GET";
		req.url='/api/tecnologia/getTecnologiasArquitectura?id='+filter.id;
		return $http(req);
	};
	
	//listado de tecnologias
	service.getTecnologias=function(item)
	{
		var req={};
		req.method="POST";
		req.url='/api/tecnologia/obtenerTecnologias';
		req.data=item;
		return $http(req);
	};
	
	//borrar tecnologia
	service.deleteTecnologia=function(tecnologia)
	{
		var req={};
		req.method="DELETE";
		req.url= '/api/tecnologia/eliminarTecnologia';
		req.data=tecnologia;
		return $http(req);
	};
	
	//crear tecnologia
	service.altaTecnologia=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/tecnologia/crearTecnologia';
		return $http(req);
	};
	
	//editar tecnologia
	service.putTecnologia=function(item)
	{
		var req={};
		req.method="PUT";
		req.data=item;
		req.url='/api/tecnologia/actualizarTecnologia';
		return $http(req);
	};
	/****************************************************/
	/*		GESTION DE CLIENTES						    */
	/****************************************************/
	service.getClientesCombo=function()
	{
		return $http.get("/api/cliente/getAllClientes");
		
	};
	service.getClientes=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/cliente/obtenerClientes';
		return $http(req);
	};
	
	/****************************************************/
	/*		GESTION DE TAMAÑOS							*/
	/****************************************************/
	
	//LISTADO DE TAMAÑOS
	service.getTamanos=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		console.log(item);
		req.url='/api/tamanio/obtenerTamanios';
		return $http(req);
		
	};
	
	//Crear tamaño
	service.altaTamanos=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/tamanio/crearTamanio';
		return $http(req);
		
	};
	
	//Borrar tamaño
	service.deleteTamano=function(item)
	{
		var req={};
		req.method="DELETE";
		req.url= '/api/tamanio/eliminarTamanio';
		req.data=item;
		return $http(req);
	};
	
	//editar tamaño
	service.putTamano=function(item)
	{
		var req={};
		req.method="PUT";
		req.data=item;
		req.url='/api/tamanio/actualizarTamanio';
		return $http(req);
	};
	
	
	/****************************************************/
	/*		COMPLEJIDADES					            */
	/****************************************************/
	service.getComplejidades=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/complejidad/obtenerComplejidades';
		return $http(req);
	};
	
	/****************************************************/
	/*	GESTION DE 	GRUPO TAREAS					    */
	/****************************************************/
	service.getGruposTareas=function(filter)
	{
		var req={};
		req.method="POST";
		req.data=filter;
		req.url='/api/grupoTarea/obtenerGrupoTareas';
		console.log(filter);
		return $http(req);
	};
	
	
	
	/****************************************************/
	/*		GESTION DE PROYECTOS                        */
	/****************************************************/
	service.getProyectos=function(filter)
	{
		var req={};
		req.method="POST";
		req.data=filter;
		req.url='/api/proyecto/obtenerProyectos';
		console.log(filter);
		return $http(req);
	};
	service.altaProyectos=function(filter)
	{
		var req={};
		req.method="POST";
		req.data=filter;
		req.url='/api/proyecto/crearProyecto';
		return $http(req);
		
	};
	service.putProyectos=function(item)
	{
		var req={};
		req.method="PUT";
		req.data=filter;
		req.url='/api/proyecto/actualizarProyecto';
		return $http(req);
	};
	
	/****************************************************/
	/*		GESTION DE PERSONAS						    */
	/****************************************************/
	service.getPersonas=function(filter)
	{
		var req={};
		req.method="POST";
		req.url='/api/tecnologia/obtenerTecnologias';
		req.data=filter;
		return $http(req);
	};
	service.deletePersonas=function(persona)
	{
		var req={};
		req.method="DELETE";
		req.url= '/api/tecnologia/eliminarTecnologia';
		req.data=tecnologia;
		return $http(req);
	};
	service.altaPersonas=function(item)
	{
		var req={};
		req.method="POST";
		req.data=item;
		req.url='/api/tecnologia/crearTecnologia';
		return $http(req);
	};
	service.putPersonas=function(item)
	{
		var req={};
		req.method="PUT";
		req.data=item;
		req.url='/api/tecnologia/actualizarTecnologia';
		return $http(req);
	};
	return service;
	
	
	
}
app.factory('request',getters);