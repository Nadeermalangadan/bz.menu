(function () {
define('bz.menu/app',[
    'angular', 'bz', 'bz-nested-model'
], function(angular) {
    'use strict';

    return angular.module('bz.menu', ['bz', 'bzNestedModel']);
});
define('bz.menu/factories/elements',[
    'bz.menu/app'
], function(app) {
    'use strict';

    app.factory('bz.menu.factories.elements', ['bzNestedResource', 'bzConfig', function (bzNestedResource, bzConfig) {
        var MenuElementsService = bzNestedResource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
            update: { method: 'POST' },
            getSettings: { method: 'POST', params: { 'action': 'getSettings' }, isArray: false }
        });
        return MenuElementsService;
    }]);

});
define('bz.menu/directives/menu',[
    'bz.menu/app',

    'bz.menu/factories/elements'
], function (app) {
    'use strict';

    app.directive('bzMenuNavigation', ['$parse', '$compile', 'bzUser', function ($parse, $compile, bzUser) {
        var template =
                '<ul ng-class="menuClass">' +
                '      <li class="bz-menu-item open" ng-repeat="item in items" ng-class="{active:item.$active == true, \'dropdown\': item.items.length}">' +
                '           <a href="{{item.url}}" target="{{item.target}}" data-toggle="dropdown" class="bz-menu-dropdown">' +
                '               {{item.title}} <b ng-if="item.items.length > 0" class="caret"></b>' +
                '           </a>' +
                '           <div bz-menu-navigation="item.items" class="{{item.class}}"></div>' +
                '      </li>' +
                '</ul>',
            el = null;
        return {
            restrict: 'A',
            scope: {
                'menu': '=bzMenuNavigation',
                'menuClass': '@class'
            },
            replace: true,
            link: function (scope, element, attrs) {
                var currentMenu = null,
                    render = function (e) {
                        var menu = angular.copy(currentMenu);
                        if (angular.isArray(menu) && menu.length > 0) {
                            var items = menu;
                            angular.forEach(menu, function (item, n) {
                                item.access = item.access || [];
                                item.class = 'dropdown-menu';
                                if (!bzUser.has(item.access)) {
                                    items.splice(n, 1);
                                }
                            });
                            scope.items = items;
                            var temp = (items.length < 1) ? template : template.replace('class="dropdown-toggle"', '');

                            var el = angular.element(temp);
                            element.replaceWith(el);
                            element = el;
                            $compile(element)(scope)
                        }
                    };
                scope.$watch('menu', function (menu) {
                    if (angular.isDefined(menu)) {
                        currentMenu = menu;
                    }
                    render();
                });
                if (!el) {
                    el = element;
                    bzUser.$change(render);
                }
            }
        };
    }]);

});
define('bz.menu/factories/menu',[
    'angular',
    'bz.menu/app',
    'bz.menu/factories/elements'
], function(angular, app) {
    'use strict';

    app.factory('bz.menu.factories.menu', ['$resource', 'bz.menu.factories.elements', 'bzConfig',
        function ($resource, ElementsService, bzConfig) {
            var MenuService = $resource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
                create: { method: 'PUT' }
            });
            MenuService.prototype.getElements = function(cb, allItems) {
                cb = cb || angular.noop;
                allItems = allItems || false;
                ElementsService.getTree({ 'id': this.id, 'all': allItems }, cb);
            };
            return MenuService;
        }
    ]);

});
define('bz.menu',[
    'bz.menu/app',

    'bz.menu/directives/menu',

    'bz.menu/factories/menu'
], function (app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());