/*
 * textbook.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global, $, textbook */

textbook.model = (function () {
  'use strict';
  var
    configMap = {},
    stateMap  = {},

    isFakeData = (textbook.config.env == 'local'),
    tree, initModule;
  tree = (function () {
    var
        load
    ;

    load = function (callback) {
        isFakeData ? callback( textbook.data.tree ) : textbook.remote.query( 'remote/json' ).done(callback);
    };

    return {
      load  : load
    };
  }());

  initModule = function () {

  };

  return {
    initModule : initModule,
    tree       : tree
  };
}());