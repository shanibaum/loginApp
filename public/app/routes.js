/**
 * Created by shani on 02/08/2017.
 */
angular.module('AppRoutes',['ngRoute'])
    .config(function ($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({enabled:true,requireBase:false});
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/login',{
            templateUrl: 'app/views/pages/users/login.html'
        })
            .otherwise({redirectTo : '/'})
    });