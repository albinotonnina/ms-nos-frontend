module.exports = {
    path: '/admin/rings',
    template: function (){
        var jf = require('jsonfile')
        var file = 'static/get/rings.json';
        return jf.readFileSync(file);
    }
};
