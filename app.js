(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', foundItems)
  .service('MenuSearchService', MenuSearchService);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nid = this;
    nid.searchTerm = "";
    nid.found = [];

    nid.narrow = function () {
      var promise = MenuSearchService.getMatchedMenuItems(nid.searchTerm);

      promise.then( function (result) {
        nid.found = result;
      });
    }

    nid.errorCheck = function () {
      // console.log("Error: " + ((nid.searchTerm.length <= 0) && (nid.found.length <= 0)));
      // console.log(nid.searchTerm.length);
      // console.log(nid.found.length);
      return (nid.searchTerm.length <= 0 && nid.found.length <= 0);

    }

    nid.remove = function (index) {
      nid.found.splice(index, 1);
    }

  }

  function foundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&',
        errorCheck: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'nid',
      bindToController: true
    };
    return ddo;
  }

 MenuSearchService.$inject = ['$q', '$http'];
 function MenuSearchService($q, $http) {
   var service = this;

   service.getMatchedMenuItems = function (searchTerm) {
     console.log("Getting menu items...");

     var deferred = $q.defer();
     var found = [];
     $http({
       method: "GET",
       url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
     }).then(function (result) {
         // process result and only keep items that match
         var found = [];
         console.log("Here's the menu! We are looking for " + searchTerm);
         console.log(result);
         console.log("Length: " + result.data.menu_items.length);

         for (var i = 0; i < result.data.menu_items.length; i++) {
           if( searchTerm.length > 0 && ( result.data.menu_items[i].name.toLowerCase().includes(searchTerm.toLowerCase()) || result.data.menu_items[i].description.toLowerCase().includes(searchTerm.toLowerCase()))){
             console.log("ITEM FOUND: " + result.data.menu_items[i].short_name);
             found.push(result.data.menu_items[i]);
           }
         }

         // return processed items
         console.log("returning. items found: " + found.length);
         console.log(found);
         deferred.resolve(found);
     })
     .catch(function (error) {
       console.log("getMatchedMenuItems: error retrieving data from server:" + error)
       deferred.reject(error);
     });

     return deferred.promise;
   }
 }

})();
