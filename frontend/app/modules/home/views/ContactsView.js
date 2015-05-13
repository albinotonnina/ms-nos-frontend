define(function (require){
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/ContactsView.hbs'),

        /** @private */
        ui: {},

        events: {},

        /** @private */
        initialize: function (){

        },

        
        onShow: function (){
        },


        /** @private */
        onRender: function (){


        },

        /** @private */
        onDestroy: function (){


        }

    });

});