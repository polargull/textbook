/*
 * textbook.shell.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, textbook */

textbook.shell = (function () {
  var
    configMap = {
      main_html : '<p>shell test</p>'
    },
    stateMap  = {
      $container        : null,
      anchor_map        : {}
    },
    jqueryMap = {},

    copyAnchorMap,    setJqueryMap,
    changeAnchorPart, onHashchange,
    setTreeAnchor, initModule;
  copyAnchorMap = function () {
    return $.extend( true, {}, stateMap.anchor_map );
  };
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container : $container
    };
  };
  setTreeAnchor = function(textValue) {
    changeAnchorPart({ });
  };
  changeAnchorPart = function ( arg_map ) {
    var
      anchor_map_revise = copyAnchorMap(),
      bool_return       = true,
      key_name, key_name_dep;

    // Begin merge changes into anchor map
    KEYVAL:
    for ( key_name in arg_map ) {
      if ( arg_map.hasOwnProperty( key_name ) ) {

        // skip dependent keys during iteration
        if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }

        // update independent key value
        anchor_map_revise[key_name] = arg_map[key_name];

        // update matching dependent key
        key_name_dep = '_' + key_name;
        if ( arg_map[key_name_dep] ) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        }
        else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }
    try {
      $.uriAnchor.setAnchor( anchor_map_revise );
    }
    catch ( error ) {
      // replace URI with existing state
      $.uriAnchor.setAnchor( stateMap.anchor_map,null,true );
      bool_return = false;
    }
    // End attempt to update URI...

    return bool_return;
  };
  onHashchange = function ( event ) {
    var
      anchor_map_previous = copyAnchorMap(),
      anchor_map_proposed;

    // attempt to parse anchor
    try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
    catch ( error ) {
      $.uriAnchor.setAnchor( anchor_map_previous, null, true );
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;
    return false;
  };
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
//    $container.html( configMap.main_html );
    setJqueryMap();

    $.uriAnchor.configModule({});

    textbook.tree.configModule( {set_tree_anchor : setTreeAnchor} );
    textbook.tree.initModule( jqueryMap.$container );

    $(window)
      .bind( 'hashchange', onHashchange )
      .trigger( 'hashchange' );

  };

  return { initModule : initModule };
}());