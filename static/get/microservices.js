module.exports = {
    path: '/admin/microservices',
    template: function (){
        var jf = require('jsonfile')
        var file = 'static/get/microservices.json';
        return jf.readFileSync(file);
    }
};
