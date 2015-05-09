module.exports = {
    server: {
        options: {
            port: 9001,
            middleware: function (connect) {
                var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                var dir = 'frontend';
                var target = require('grunt').config('target');
                if(target !== 'development'){
                    dir = 'build/dist';
                }

                return [
                    proxy,
                    connect.static(dir),
                    connect.directory(dir)
                ];
            }

        },
        proxies: [
            //{
            //    context: '/admin',
            //    host: '54.228.244.72',
            //    port: 9991,
            //    https: false,
            //    xforward: false
            //},
            {
                context: '/admin',
                host: 'localhost',
                port: 3000,
                https: false,
                xforward: false
            }

        ]
    }
};