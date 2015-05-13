define(function (require){
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/HowView.hbs'),

        /** @private */
        ui: {},

        events: {},

        /** @private */
        initialize: function (){

        },

        
        onShow: function (){
            this.$el.find('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },


        /** @private */
        onRender: function (){


        },

        /** @private */
        onDestroy: function (){


        }

    });

});