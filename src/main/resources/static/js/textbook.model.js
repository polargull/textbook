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
/*global TAFFY, $, textbook */

textbook.model = (function () {
  'use strict';
  var
    configMap = {},
    stateMap  = {},

    isFakeData = true,
    tree, initModule;

  tree = (function () {
    var
      load
     ;

    load = function (callback) {
        return textbook.data.query( './data/tree.json' ).done(callback);
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