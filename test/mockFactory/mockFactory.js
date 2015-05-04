/* jshint expr: true */
/* global define */

'use strict';

define('mockFactory', ['underscore'], function(_) {
    /**
     * @class MockFactory
     */
    return {
        extend: function(object) {
            _.extend(this, object);
        }
    };
});