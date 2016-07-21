
//No funciona de momento... a medias
app.directive("validaFecha",function (dateFilter, uibDateParser, uibDatepickerPopupConfig) {
	return {


	      restrict: 'A',

	   
	      require: 'ngModel',

	    
	      link: function(scope, element, attr, ngModel) {
	    	  function returnView()
	    	  {
	    		  return ngModel.$viewValue;
	    	  }
	    	scope.$watch(returnView,function(value,oldValue){
	    		 
	    		 
        	 console.log("validate "+value+" "+oldValue);
                  if (!attr.ngRequired && !value) {
                	  ngModel.$setValidity("isDate",true);
        
                  
                  }
              else if (angular.isDate(value)) {
            	  ngModel.$setValidity("isDate",true);
            	  
    
                  } else if (angular.isString(value)) {
                	  console.log("parse string wohoho");
                      var date = uibDateParser.parse(value, 'dd/M/yyyy');
                      if(angular.isDate(date))
                    	  {
                    	  ngModel.$setValidity("isDate",true);
                    	  console.log("This string is a date!!")
                    	  }
                      else   ngModel.$setValidity("isDate",false);
           
                  } else {
                	  ngModel.$setValidity("isDate",false);
                  }
  
  
         });
 
            
        }
	    }
	});