define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/InputView.hbs'),

        /** @private */
        ui: {
            textInput: '#base-url-input',
            inputError: '.input-error span',
            spinner:'.spinner div'
        },

        events: {
            'keyup @ui.textInput': '_keyupOnInput'
        },

        /** @private */
        _keyupOnInput: function (event){
            if(event.keyCode == 13){
                var inputVal = $(event.target).val();
                this._checkUrl(inputVal, _.bind(function (result){
                    if(result){
                        this._goToMap(inputVal);
                    } else{
                        this._showInputError();
                    }

                }, this));


            }
        },

        /** @private */
        _goToMap: function (url){
            window.app.commands.execute('navigate:map', {url: url});
        },

        /** @private */
        _checkUrl: function urlExists(url, callback){
            this.ui.spinner.fadeIn('fast');
            this.ui.inputError.fadeOut('fast');

            $.ajax({
                type: 'HEAD',
                url: url + '/admin/microservices',
                timeout: 5000,
                success: function (){
                    callback(true);
                },
                error: function (){
                    callback(false);
                }
            });
        },

        /** @private */
        _showInputError: function urlExists(){

            this.ui.spinner.fadeOut('fast');
            this.ui.inputError.fadeIn('fast');


        }

    });

});