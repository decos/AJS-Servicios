var app = angular.module('promesaApp.servicios', []);

//Declara una fuente valida
app.config(function ($sceDelegateProvider) {
 $sceDelegateProvider.resourceUrlWhitelist(['http://www.json-generator.com/api/json/get/cgCZDBtZmG']);
})

//Nombre del servicio, [req1, req2, funcion(req1, req2)]
//Retornar un objeto
app.factory('Personas', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){

    var self = {
  			"cargando" : false,
        "mensaje" : "",
  			"data" : []
		};

    self.cargarData = function(){
        self.cargando = true;

        var q = $q.defer();

        console.log("Funcion llamada");
        //Traer informacion fuera de nuestro dominio
        var url = "http://www.json-generator.com/api/json/get/cgCZDBtZmG";
        $http.jsonp( url, {jsonpCallbackParam: 'callback'} )
          .then(function success( response ){
              /*self.cargando = false;
              self.data = response.data;
              console.log("Todo bien");
              console.log(response);*/

              //Solo para fines didacticos, 2 segundos
              setTimeout(function(){
                  q.resolve( response.data );
              }, 2000);

          }, function error( response ){
              console.log(":(");
              console.log(response);
              q.reject("Error al cargar");
          });

        return q.promise;
    };

    $rootScope.promise = self.cargarData();
    $rootScope.promise.then(
      function(data){
          self.cargando = false;
          self.mensaje = "Información cargada correctamente";
          self.data = data;
      }, function(error){
          self.cargando = false;
          self.mensaje = "Error al cargar data";
          console.error(error);
      });

    return self;

}])
