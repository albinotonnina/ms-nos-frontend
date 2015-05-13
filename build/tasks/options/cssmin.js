module.exports = {

    options: {
        shorthandCompacting: false,
        roundingPrecision: -1
    },
    target: {
        files: {
            'frontend/static_files/styles/style.css': [
                'frontend/bower_components/lessfonts-open-sans/dist/css/open-sans.css',
                'frontend/bower_components/highlightjs/styles/idea.css',
                'frontend/bower_components/fullpage.js/jquery.fullPage.css',
                'frontend/bower_components/normalize.css/normalize.css',
                'frontend/bower_components/leaflet/dist/leaflet.css',
                'frontend/static_files/main.css'
            ]
        }
    }

};