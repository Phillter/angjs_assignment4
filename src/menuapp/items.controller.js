(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsListController', ItemsListController)

  ItemsListController.$inject = ['MenuDataService', 'itemsData'];
  function ItemsListController(MenuDataService, itemsData) {
    var itemsList = this;
    itemsList.items = itemsData.menu_items;
    itemsList.category = itemsData.category.name;
    itemsList.selectedIdx = 0;

    itemsList.setSelected = function (idx) {
      if( itemsList.selectedIdx == idx ){
        itemsList.selectedIdx = null;
      }
      else{
        itemsList.selectedIdx = idx;
      }
    }
  }
})();
