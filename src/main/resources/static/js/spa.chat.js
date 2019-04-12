/*
 * spa.chat.js
 * Chat feature module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, spa */

spa.chat = (function () {
  var
    configMap = {
      main_html : String() + '<input id="testText" type="text"></input><button id="testBtn">Test</button>',
      settable_map : {set_text_anchor : true},
      set_text_anchor : null
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap, configModule, initModule,
    onTestBtn
    ;
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
        $container  : $container,
        $testText   : $( '#testText' ),
        $testBtn    : $( '#testBtn' )
    };
  };
  onTestBtn = function() {
    jqueryMap.$testText.val('test');
    configMap.set_text_anchor('test');
  };
  configModule = function ( input_map ) {
    spa.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  initModule = function ( $container ) {
    $container.append( configMap.main_html );
    stateMap.$container = $container;
    setJqueryMap();
    jqueryMap.$testBtn.on('click', onTestBtn);
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());