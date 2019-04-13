/*
 * textbook.tree.js
 * Chat feature module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, textbook */

textbook.tree = (function () {
  var
    configMap = {
      main_html : String() + '',
      settable_map : {set_tree_anchor : true},
      set_tree_anchor : null
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap, configModule, initModule,
    zTree
    ;
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
        $container  : $container,
        $bookTree   : $( '#bookTree' ),
        $selectAll  : $( '#selectAll' )
    };
  };
  configModule = function ( input_map ) {
    textbook.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  initModule = function ( $container ) {
    stateMap.$container = $container;
    setJqueryMap();
    zTree = $.fn.zTree.getZTreeObj("bookTree");
        var className = "dark";

        function beforeDrag(treeId, treeNodes) {
            return false;
        }

        function beforeEditName(treeId, treeNode) {
            className = (className === "dark" ? "" : "dark");
            showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
            zTree.selectNode(treeNode);
            setTimeout(function() {
                if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
                    setTimeout(function() {
                        zTree.editName(treeNode);
                    }, 0);
                }
            }, 0);
            return false;
        }
    function selectAll() {
        zTree.setting.edit.editNameSelectAll = jqueryMap.$selectAll.attr("checked");
    }
    textbook.model.tree.load(function(data) {
        $.fn.zTree.init(jqueryMap.$bookTree, {
           view: {
               selectedMulti: false
           },
           data: {
               simpleData: {
                   enable: true
               }
           }
       }, data);
    });

    jqueryMap.$selectAll.bind("click", selectAll);
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