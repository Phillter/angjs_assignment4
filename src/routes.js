(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })

    //Categories page
    .state('categories', {
      url:'/categories',
      templateUrl: 'src/menuapp/templates/categories.template.html',
      controller: 'CategoriesListController as categoriesList',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    //Items page
    .state('items', {
      url: '/{categoryShortName}/items',
      templateUrl: '/src/menuapp/templates/items.template.html',
      controller: 'ItemsListController as itemsList',
      resolve: {
        items: ['MenuDataService', '$stateParams',
          function (MenuDataService, $stateParams) {
            console.log("in routes");
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
