define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore');


    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/HomeView.hbs'),

        /** @private */
        ui: {
            msnosnetwork:'.msnos-network'
        },

        events: {},

        /** @private */
        initialize: function (){

        },

        onShow: function (){


 setTimeout(_.bind(function(){


     $(this.ui.msnosnetwork).jqFloat({
         width: 10,
         height: 10,
         speed: 1000
     });


 },this),300);


            setTimeout(_.bind(function(){


                $(this.ui.msnosnetwork).jqFloat('stop');
                console.log('stop');

            },this),5500);



        },


        /** @private */
        onRender: function (){


        },

        /** @private */
        onDestroy: function (){


        }
    });

});