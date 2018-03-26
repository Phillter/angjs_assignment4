(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl:'src/menuapp/templates/items.template.html',
    //templateUrl: '../templates/items.template.html',
    bindings: {
      itemsData: '<'
    }
  });

})();
