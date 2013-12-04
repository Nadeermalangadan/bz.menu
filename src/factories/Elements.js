define([
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