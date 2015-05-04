module.exports = {
    path: '/admin/routes',
    template: function (){
        var jf = require('jsonfile')
        var file = 'static/get/routes.json';
        return jf.readFileSync(file);
    }
};
