define([
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