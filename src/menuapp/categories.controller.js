(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['MenuDataService', 'categories'];
  function CategoriesListController(MenuDataService, categories) {
    var categoriesList = this;
    categoriesList.categories = categories;
    console.log("Categories controller categories:", categoriesList.categories);
  }
})();
