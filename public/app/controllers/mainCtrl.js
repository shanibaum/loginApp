/**
 * Created by shani on 02/08/2017.
 */
angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$location,$route,$rootScope){
    var app = this;

    $rootScope.$on('$routeChangeStart',function () {
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                app.username = data.data.username;
            });
        }else{
            app.isLoggedIn = false;
            app.username = "";
        }
    });

// Function to submit form and login
    app.doLogin = function(loginData) {
        app.loading = true;
        app.errorMsg = false;
        // Initiate service to save the user into the dabase
        Auth.login(app.loginData).then(function(data) {
            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + '...Redirecting';
                // Redirect to home page after 2000 miliseconds
                $timeout(function() {
                    $location.path('/');
                    app.loginData = '';
                    app.successMsg = '';
                    $route.reload();
                }, 2000);
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };

    app.logout = function(){
        Auth.logout();
        $location.path('/login');
    }
});



