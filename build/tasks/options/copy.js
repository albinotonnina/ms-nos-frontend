module.exports = {
    production: {
        files: [
            {
                expand: true,
                src: ['frontend/static_files/images/*'],
                dest: 'build/dist/static_files/images/',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/static_files/images/slides/*'],
                dest: 'build/dist/static_files/images/slides/',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/static_files/images/logos/*'],
                dest: 'build/dist/static_files/images/logos/',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/static_files/styles/*'],
                dest: 'build/dist/static_files/styles/',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Regular/*'],
                dest: 'build/dist/static_files/styles/font/OpenSans/OpenSans-Regular',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Semibold/*'],
                dest: 'build/dist/static_files/styles/font/OpenSans/OpenSans-Semibold',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Light/*'],
                dest: 'build/dist/static_files/styles/font/OpenSans/OpenSans-Light',
                filter: 'isFile',
                flatten: true
            }
        ]
    },
    development: {
        files: [
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Regular/*'],
                dest: 'frontend/static_files/styles/font/OpenSans/OpenSans-Regular',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Semibold/*'],
                dest: 'frontend/static_files/styles/font/OpenSans/OpenSans-Semibold',
                filter: 'isFile',
                flatten: true
            },
            {
                expand: true,
                src: ['frontend/bower_components/lessfonts-open-sans/dist/fonts/OpenSans/OpenSans-Light/*'],
                dest: 'frontend/static_files/styles/font/OpenSans/OpenSans-Light',
                filter: 'isFile',
                flatten: true
            }
        ]
    }
};