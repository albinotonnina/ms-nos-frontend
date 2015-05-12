(function () {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /Spec\.js$/;

    var pathToModule = function (path) {
        return path.replace(/^\/base\/frontend\/app\//, '');
    };

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });

    var requirejsConfig = {
    "paths": {
        "jquery": "../bower_components/jquery/dist/jquery",
        "underscore": "../bower_components/underscore/underscore",
        "backbone": "../bower_components/backbone/backbone",
        "marionette": "../bower_components/backbone.marionette/lib/backbone.marionette",
        "backbone.babysitter": "../bower_components/backbone.babysitter/lib/backbone.babysitter",
        "backbone.wreqr": "../bower_components/backbone.wreqr/lib/backbone.wreqr",
        "text": "../bower_components/requirejs-text/text",
        "handlebars" : "../bower_components/handlebars/handlebars",
        "when" : "../bower_components/when",
        "Lumberman" : "../bower_components/lumberman/src",
        "googlemaps": "../bower_components/googlemaps-amd/src/googlemaps",
        "leaflet": "../bower_components/leaflet/dist/leaflet",
        "moment": "../bower_components/momentjs/moment",
        "accordion": "../bower_components/accordion/accordion",
        "jquery.exists": "../bower_components/jquery.exists/jquery.exists",
        "jquery.scrollto": "../bower_components/jquery.scrollTo/jquery.scrollTo",
        "fullpage": "../bower_components/fullpage.js/jquery.fullPage.min",
        "three": "../bower_components/three.js/three.min"
    },
    "shim": {
        "handlebars" : {
            "exports": "Handlebars"
        }
    }
};

    requirejsConfig.baseUrl = '/base/frontend/app';
    requirejsConfig.deps =  allTestFiles; // dynamically load all test files
    requirejsConfig.callback = window.__karma__.start;

    require.config(requirejsConfig);

})();