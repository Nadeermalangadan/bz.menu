require(['angular', 'bz', 'angular-locale', 'bz.menu'], function(angular) {

    var app = angular.module('app', ['bz', 'bz.menu']);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider', '$httpProvider',
        function($routeSegmentProvider, $locationProvider, bzConfig, $logProvider, bzUser, $httpProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // for apiari
        $httpProvider.defaults.withCredentials = false;


        $routeSegmentProvider.options.autoLoadTemplates = true;

        // если включено, то при старте приложения будет грузить данные про текущею сессию
        bzConfig.checkSessionOnStart(true);

        //$logProvider.debugEnabled(false);

        $routeSegmentProvider
            .when('/', 'home')
            .segment('home', {
                template: 'Home',
                resolve: {
                    permissions: bzUser.access()
                },
                resolveFailed: bzConfig.errorResolver()
            })
            .when('/testpage', 'test')
            .segment('test', {
                templateUrl: 'views/testpage.html',
                dependencies: ['id'],
                controller: 'test',
                resolve: {
                    permissions: bzUser.access(['admin.access']),
                    page: ['$q', function($q) {
                        var defer = $q.defer();
                        defer.resolve('Hello, world!');
                        return defer.promise;
                    }]
                },
                resolveFailed: bzConfig.errorResolver()
            });
    }]);

    app.run(['$rootScope', '$location', 'bzUser', function($rootScope, $location, $user) {
        $rootScope.items = [
            {
                "title": "Тест верстки",
                "url": "/test"
            },
            {
                "title": "Администрирование",
                "url": "",
                "access": ["admin.access"],
                "items": [
                    {
                        "title": "Все учетные записи",
                        "url": "/users",
                        "access": ["auth.can_edit_users"]
                    },
                    {
                        "title": "Все роли",
                        "url": "/roles",
                        "access": ["auth.can_manage_roles"]
                    },
                    {
                        "title": "Тесты",
                        "url": "/tests",
                        "access": ["auth.can_manage_roles"]
                    }
                ]
            }
        ];
    }]);

    app.controller('test', ['$scope', 'bzUser', 'page', function($scope, $user, page) {
        $scope.page = page;
    }]);

    app.controller('login', ['$scope', 'bzUser', function($scope, $user) {
        $scope.login = function(user) {
            $user.$login(user);
        }
    }]);

    angular.bootstrap(document.documentElement, [app.name]);

    return app;
});