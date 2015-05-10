define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('marionette');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/InputView.hbs'),

        /** @private */
        ui: {},

        events: {},

        /** @private */
        initialize: function (){

        },

        onShow: function (){
            $('#trigger_map').on('click', _.bind(function (ev){
                ev.preventDefault();
                var inputVal = $('#base-url-input').val();


                this._checkUrl(inputVal, _.bind(function (result){
                    if(result){
                        this._goToMap(inputVal);
                    } else{
                        alert('error');
                    }

                }, this));


            }, this));
        },


        /** @private */
        onRender: function (){


        },

        /** @private */
        onDestroy: function (){


        },

        _goToMap: function (url){
            window.app.commands.execute('navigate:map', {url: url});
        },

        _checkUrl: function urlExists(url, callback){
            $.ajax({
                type: 'HEAD',
                url: url + '/admin/microservices',
                timeout:5000,
                success: function (){
                    callback(true);
                },
                error: function (){
                    callback(false);
                }
            });
        }

    });

});