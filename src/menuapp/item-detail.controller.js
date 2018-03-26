(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['$stateParams', 'items'];
  function ItemDetailController($stateParams, items) {
    var itemDetail = this;
    itemDetail.item = items[$stateParams.itemId];
    itemDetail.detail = item.description;
  }

})();
