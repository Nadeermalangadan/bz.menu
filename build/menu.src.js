(function () {
define('bz.menu/app',[
    'angular', 'bz', 'bz-nested-model'
], function(angular) {
    'use strict';

    return angular.module('bz.menu', ['bz', 'bzNestedModel']);
});
define('directives/dropdown',[
    'bz.menu/app'
], function (app) {
    'use strict';

    app.directive('bzMenuItem', ['$parse', '$compile', 'bzUser', function ($parse, $compile, bzUser) {
        return {
            restrict: 'C',
            scope: false,
            replace: true,
            link: function (scope, element, attrs) {
                console.info(scope.item)
            }
        };
    }]);

});
define('bz.menu/directives/menu',[
    'bz.menu/app',

    'directives/dropdown'
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
define('bz.menu',[
    'bz.menu/app',

    'bz.menu/directives/menu'
], function (app) {

    //app.config([function() {}]);

    //app.run([function() {}]);

    return app;
});}());