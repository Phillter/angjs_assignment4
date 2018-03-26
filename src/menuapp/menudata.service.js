(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$q', '$http'];
  function MenuDataService($q, $http) {
    var service = this;

    //variables

    //functions
    service.getAllCategories = function () {
      var deferred = $q.defer();
      var promise = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/categories.json")
      })
      .then( function (result) {
        console.log("Found categories: ", result.data);
        deferred.resolve(result.data);
      })
      .catch(function (error) {
        console.log("getAllCategories: error retrieving data from server:" + error)
        deferred.reject(error);
      });

      return deferred.promise;
    };

    service.getItemsForCategory = function (categoryShortName) {
      var deferred = $q.defer();
      console.log("getItemsForCategory: Category is " + categoryShortName);
      var promise = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
      })
      .then( function (result) {
        console.log("Found items: ", result.data.menu_items);
        deferred.resolve(result.data.menu_items);
      })
      .catch(function (error) {
        console.log("getItemsForCategory: error retrieving data from server:" + error)
        deferred.reject(error);
      });

      return deferred.promise;
    };

  }

})();
