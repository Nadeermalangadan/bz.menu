define([
    'bz.menu/app'
], function(app) {
    'use strict';

    app.factory('bz.menu.factories.elements', ['ngNestedResource', 'bzConfig', function (ngNestedResource, bzConfig) {
        var MenuElementsService = ngNestedResource(bzConfig.resource('/menu/:id'), { 'id': '@id' }, {
            update: { method: 'POST' },
            getSettings: { method: 'POST', params: { 'action': 'getSettings' }, isArray: false }
        });
        return MenuElementsService;
    }]);

});