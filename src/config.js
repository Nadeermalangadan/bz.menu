requirejs.config({
    packages: [{
        name: 'bz.menu',
        location: '.',
        main: 'run'
    }],
    paths: {
        'bz': '../bower_components/bazalt/build/bz',

        // angular
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-route-segment': '../bower_components/angular-route-segment/build/angular-route-segment',

        'bz-nested-model': '../bower_components/bz-nested-model/bz-nested-model',

        // tests
        'jasmine': '../bower_components/jasmine/lib/jasmine-core'
    },
    shim: {
        'angular': { exports: 'angular' },
        'bz': { deps: ['angular'] },
        'bz-nested-model': { deps: ['angular'] }
    },
    priority: [
        'angular'
    ],
    urlArgs: 'v=1.1'
});