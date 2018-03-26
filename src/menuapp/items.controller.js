(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsListController', ItemsListController)

  ItemsListController.$inject = ['MenuDataService', 'items'];
  function ItemsListController(MenuDataService, items) {
    var itemsList = this;
    itemsList.items = items;

    console.log("Items controller items:", itemsList.items);
  }
})();
