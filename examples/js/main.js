require.config({
    baseUrl: './js',

    packages: [{
        name: 'bz.menu',
        location: '../../build',
        main: 'menu'
    }],

    paths: {
        'angular': '../../bower_components/angular/angular',
        'angular-locale': 'http://code.angularjs.org/1.2.0-rc.3/i18n/angular-locale_uk-ua',

        'bz-nested-model': '../../bower_components/bz-nested-model/bz-nested-model'
    },

    shim: {
        'angular': { exports: 'angular' },
        'angular-locale': { deps: ['angular'] }
    }
});
require(['app']);