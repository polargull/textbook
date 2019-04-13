/*
 * textbook.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, textbook */

var textbook = (function () {
  var initModule = function ( $container ) {
    textbook.shell.initModule( $container );
  };
  
  return { initModule: initModule };
}());