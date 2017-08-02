/**
 * Created by shani on 02/08/2017.
 */
angular.module('userApp',['AppRoutes','mainController','authServices','ngAnimate'])
    .config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptors')
    });