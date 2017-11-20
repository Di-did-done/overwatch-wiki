export const AppRoutesConfig = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    ($stateProvider, $urlRouterProvider, $locationProvider) => {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/heroes');
    }];

